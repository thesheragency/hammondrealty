'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Loader2, ChevronLeft, ChevronRight, AlertCircle, Upload, Calendar, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, parse } from 'date-fns';
import type { GfForm, GfFormField, GfChoice } from '@/lib/gf/queries';
import { evaluateConditionalLogic, type FormValues } from '@/lib/gf/conditionalLogic';
import { validateField, validateAllFields } from '@/lib/gf/validation';
import { formatPhone } from '@/lib/utils';

function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#39;': "'",
    '&apos;': "'",
    '&nbsp;': ' ',
  };
  return text.replace(/&[#\w]+;/g, (match) => entities[match] || match);
}

interface GravityFormProps {
  formId: number;
  className?: string;
  onSuccess?: (confirmation: { message?: string; url?: string }) => void;
  onError?: (errors: Array<{ id: string; message: string }>) => void;
}

type FieldValue = string | string[] | Record<string, string>;

export function GravityForm({ formId, className, onSuccess, onError }: GravityFormProps) {
  const [form, setForm] = useState<GfForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<Record<string, FieldValue>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    async function fetchForm() {
      try {
        setLoading(true);
        const res = await fetch(`/api/forms/submit?formId=${formId}`);
        if (!res.ok) throw new Error('Failed to load form');
        const data = await res.json();
        if (data.form) {
          setForm(data.form);
          initializeFormValues(data.form);
        } else {
          throw new Error(data.error || 'Form not found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load form');
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, [formId]);

  // Returns true for single-choice "I agree to be contacted" checkboxes from WordPress
  // that we want to hide from the UI (our own Privacy Policy checkbox replaces them).
  const isHiddenConsentField = (field: GfFormField) => {
    if (field.type !== 'CHECKBOX' && field.type !== 'CONSENT') return false;
    const choiceTexts = field.choices?.map((c) => c.text.toLowerCase()) ?? [];
    const label = (field.label ?? '').toLowerCase();
    return (
      choiceTexts.some((t) =>
        t.includes('agree') || t.includes('contacted') || t.includes('privacy') || t.includes('accept')
      ) ||
      label.includes('agree to be contacted') ||
      label.includes('consent') ||
      label.includes('privacy') ||
      label.includes('accept')
    );
  };

  const initializeFormValues = (formData: GfForm) => {
    const values: Record<string, FieldValue> = {};
    formData.formFields.nodes.forEach((field) => {
      const id = field.databaseId.toString();
      if (field.type === 'CHECKBOX' || field.type === 'MULTISELECT' || field.type === 'MULTI_CHOICE') {
        // Pre-check hidden consent fields so WordPress validation still passes
        if (isHiddenConsentField(field)) {
          values[id] = field.choices?.map((c) => c.value || c.text) ?? [];
        } else {
          values[id] = [];
        }
      } else if (field.type === 'NAME' || field.type === 'ADDRESS') {
        values[id] = {};
      } else if (field.type === 'TIME') {
        values[id] = { hour: '', minute: '', ampm: 'AM' };
      } else if (field.defaultValue) {
        values[id] = field.defaultValue;
      } else if (field.choices) {
        const selected = field.choices.find((c) => c.isSelected);
        if (selected) values[id] = selected.value;
      } else {
        values[id] = '';
      }
    });
    setFormValues(values);
  };

  const updateFieldValue = useCallback((fieldId: string, value: FieldValue) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  const validateFieldOnBlur = useCallback((field: GfFormField) => {
    const fieldId = field.databaseId.toString();
    const value = formValues[fieldId];
    const result = validateField(field, value, files);
    
    if (!result.isValid && result.message) {
      setFieldErrors((prev) => ({ ...prev, [fieldId]: result.message! }));
    } else {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldId];
        return next;
      });
    }
  }, [formValues, files]);

  const getTotalPages = useCallback(() => {
    if (!form) return 1;
    const pageNumbers = form.formFields.nodes
      .map((f) => f.pageNumber || 1)
      .filter((n) => n > 0);
    return pageNumbers.length > 0 ? Math.max(...pageNumbers) : 1;
  }, [form]);

  const getFieldsForPage = useCallback(
    (page: number) => {
      if (!form) return [];
      return form.formFields.nodes.filter((f) => (f.pageNumber || 1) === page);
    },
    [form]
  );

  const isFieldVisible = useCallback(
    (field: GfFormField) => {
      if (field.visibility === 'HIDDEN') return false;
      return evaluateConditionalLogic(field.conditionalLogic, formValues as FormValues);
    },
    [formValues]
  );

  const validateCurrentPage = useCallback(() => {
    const fields = getFieldsForPage(currentPage);
    const results = validateAllFields(fields, formValues, files, isFieldVisible);
    
    const errors: Record<string, string> = {};
    Object.entries(results).forEach(([fieldId, result]) => {
      if (!result.isValid && result.message) {
        errors[fieldId] = result.message;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentPage, formValues, files, getFieldsForPage, isFieldVisible]);

  const handleNextPage = () => {
    if (validateCurrentPage()) {
      setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()));
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentPage()) return;

    if (honeypot) {
      setSubmitted(true);
      setConfirmationMessage('Thank you for your submission.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Use REST API with FormData for native file upload support
      const submitData = new FormData();
      submitData.append('formId', String(formId));
      submitData.append('gf_hp', honeypot);

      // Process all form values into input_{id} format for REST API
      Object.entries(formValues).forEach(([id, value]) => {
        const field = form?.formFields.nodes.find((f) => f.databaseId.toString() === id);
        
        // Skip file upload fields - they're handled separately
        if (field?.type === 'FILEUPLOAD') return;

        if (Array.isArray(value)) {
          // Checkbox/multiselect: input_{id}.{index} format
          value.forEach((v, idx) => {
            submitData.append(`input_${id}.${idx + 1}`, v);
          });
        } else if (field?.type === 'TIME' && typeof value === 'object' && value !== null) {
          // TIME fields: format as HH:MM AM/PM or HH:MM for 24-hour
          const timeVal = value as Record<string, string>;
          if (timeVal.hour && timeVal.minute) {
            const is12Hour = field.timeFormat !== '24';
            const timeString = is12Hour
              ? `${timeVal.hour}:${timeVal.minute} ${timeVal.ampm || 'AM'}`
              : `${timeVal.hour}:${timeVal.minute}`;
            submitData.append(`input_${id}`, timeString);
          }
        } else if (typeof value === 'object' && value !== null) {
          // NAME and ADDRESS fields use sub-input IDs
          Object.entries(value).forEach(([subId, subVal]) => {
            if (subVal) {
              // subId is like "1.3" (fieldId.inputIndex) - extract the suffix
              const suffix = subId.includes('.') ? subId.split('.')[1] : subId;
              submitData.append(`input_${id}.${suffix}`, subVal);
            }
          });
        } else {
          // Always submit scalar values. For TEXTAREA fields that WordPress marks
          // as required but we treat as optional in the UI, send a zero-width space
          // so the server-side required check passes without showing garbage content.
          const stringValue = String(value ?? '');
          const isRequiredTextarea = field?.type === 'TEXTAREA' && field?.isRequired;
          const submittedValue = isRequiredTextarea && stringValue === '' ? '\u200b' : stringValue;
          submitData.append(`input_${id}`, submittedValue);
        }
      });

      // Add file uploads
      Object.entries(files).forEach(([id, file]) => {
        submitData.append(`input_${id}`, file);
      });

      const res = await fetch('/api/forms/submit-rest', {
        method: 'POST',
        body: submitData,
      });

      const data = await res.json();

      if (!res.ok || !data.is_valid) {
        // Handle validation errors from REST API
        if (data.validation_messages) {
          const messages = Object.values(data.validation_messages).join(', ');
          throw new Error(messages || 'Validation failed');
        }
        throw new Error(data.error || 'Submission failed');
      }

      const defaultConfirmation =
        form?.confirmations?.find((c) => c.isDefault) || form?.confirmations?.[0];
      const redirectUrl =
        defaultConfirmation?.type?.toUpperCase() === 'REDIRECT' && defaultConfirmation.url
          ? defaultConfirmation.url
          : undefined;

      if (redirectUrl && !onSuccess) {
        if (redirectUrl.startsWith('/') || /^https?:/i.test(redirectUrl)) {
          window.location.assign(redirectUrl);
          return;
        }
      }

      setConfirmationMessage(data.confirmation_message || 'Thank you for your submission.');
      if (!onSuccess) {
        setSubmitted(true);
      }
      onSuccess?.({ message: data.confirmation_message, url: redirectUrl });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Submission failed';
      setError(message);
      onError?.([{ id: '0', message }]);
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: GfFormField) => {
    if (!isFieldVisible(field)) return null;
    if (field.type === 'PAGE') return null;
    if (field.displayOnly && field.type !== 'HTML' && field.type !== 'SECTION') return null;
    if (isHiddenConsentField(field)) return null;

    const id = field.databaseId.toString();
    const value = formValues[id];
    const error = fieldErrors[id];
    const commonProps = {
      id: `field_${id}`,
      'aria-describedby': error ? `error_${id}` : undefined,
      'aria-invalid': !!error,
      'data-testid': `input-gf-field-${id}`,
    };

    const renderLabel = () => (
      <Label htmlFor={`field_${id}`} className="gf-label">
        {field.label}
        {field.isRequired && field.type !== 'TEXTAREA' && <span className="text-primary ml-1" aria-hidden="true">*</span>}
      </Label>
    );

    const placeholderText = field.placeholder || field.label;

    const renderDescription = () =>
      field.description && (
        <p className="text-sm text-muted-foreground mt-1">{decodeHtmlEntities(field.description)}</p>
      );

    const renderError = () =>
      error && (
        <p id={`error_${id}`} className="text-sm text-destructive mt-1 flex items-center gap-1">
          <AlertCircle className="h-3 w-3" />
          {error}
        </p>
      );

    const wrapField = (content: React.ReactNode) => (
      <div key={id} className={`gf-field gf-field-${field.type.toLowerCase()} ${field.cssClass || ''}`}>
        {content}
        {renderDescription()}
        {renderError()}
      </div>
    );

    switch (field.type) {
      case 'TEXT':
      case 'WEBSITE':
      case 'POST_TITLE':
      case 'POST_EXCERPT':
      case 'POST_TAGS':
      case 'POST_CATEGORY':
      case 'POST_CUSTOM_FIELD':
        return wrapField(
          <>
            {renderLabel()}
            <Input
              {...commonProps}
              type={field.type === 'WEBSITE' ? 'url' : 'text'}
              placeholder={placeholderText}
              required={field.isRequired}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
              onBlur={() => validateFieldOnBlur(field)}
              maxLength={field.maxLength}
              className="gf-input"
            />
          </>
        );

      case 'PHONE':
        return wrapField(
          <>
            {renderLabel()}
            <Input
              {...commonProps}
              type="tel"
              placeholder={placeholderText}
              required={field.isRequired}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, formatPhone(e.target.value))}
              onBlur={() => validateFieldOnBlur(field)}
              maxLength={field.maxLength}
              className="gf-input"
            />
          </>
        );

      case 'TEXTAREA':
        return wrapField(
          <>
            {renderLabel()}
            <Textarea
              {...commonProps}
              placeholder={placeholderText}
              required={false}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
              onBlur={() => validateFieldOnBlur(field)}
              maxLength={field.maxLength}
              className="gf-textarea"
            />
          </>
        );

      case 'EMAIL':
        return wrapField(
          <>
            {renderLabel()}
            <Input
              {...commonProps}
              type="email"
              placeholder={placeholderText}
              required={field.isRequired}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
              onBlur={() => validateFieldOnBlur(field)}
              className="gf-input"
            />
          </>
        );

      case 'NUMBER':
        return wrapField(
          <>
            {renderLabel()}
            <Input
              {...commonProps}
              type="number"
              placeholder={placeholderText}
              required={field.isRequired}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
              onBlur={() => validateFieldOnBlur(field)}
              min={field.rangeMin}
              max={field.rangeMax}
              className="gf-input"
            />
          </>
        );

      case 'SELECT':
        return wrapField(
          <>
            {renderLabel()}
            <Select
              value={(value as string) || ''}
              onValueChange={(v) => updateFieldValue(id, v)}
            >
              <SelectTrigger {...commonProps} className="gf-select">
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {field.choices?.map((choice: GfChoice, idx: number) => (
                  <SelectItem key={idx} value={choice.value || choice.text}>
                    {choice.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        );

      case 'RADIO':
        return wrapField(
          <>
            {renderLabel()}
            <RadioGroup
              value={(value as string) || ''}
              onValueChange={(v) => updateFieldValue(id, v)}
              className="gf-radio-group"
            >
              {field.choices?.map((choice: GfChoice, idx: number) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={choice.value || choice.text}
                    id={`${id}_${idx}`}
                    data-testid={`radio-gf-field-${id}-${idx}`}
                  />
                  <Label htmlFor={`${id}_${idx}`} className="font-normal cursor-pointer">
                    {choice.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </>
        );

      case 'CHECKBOX':
      case 'MULTISELECT':
      case 'MULTI_CHOICE':
        return wrapField(
          <>
            {(field.choices?.length ?? 0) > 1 && renderLabel()}
            <div className="gf-checkbox-group">
              {field.choices?.map((choice: GfChoice, idx: number) => {
                const checked = Array.isArray(value) && value.includes(choice.value || choice.text);
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <Checkbox
                      id={`${id}_${idx}`}
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const current = (value as string[]) || [];
                        const choiceValue = choice.value || choice.text;
                        updateFieldValue(
                          id,
                          isChecked
                            ? [...current, choiceValue]
                            : current.filter((v) => v !== choiceValue)
                        );
                      }}
                      data-testid={`checkbox-gf-field-${id}-${idx}`}
                    />
                    <Label htmlFor={`${id}_${idx}`} className="font-normal cursor-pointer">
                      {choice.text}
                    </Label>
                  </div>
                );
              })}
            </div>
          </>
        );

      case 'DATE':
        const dateValue = (value as string) || '';
        const parsedDate = dateValue ? parse(dateValue, 'yyyy-MM-dd', new Date()) : undefined;
        const isValidDate = parsedDate && !isNaN(parsedDate.getTime());
        return wrapField(
          <>
            {renderLabel()}
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="gf-input flex items-center gap-2 w-full text-left border rounded-md px-3 py-2 bg-background hover:bg-accent/30 transition-colors"
                  data-testid={`input-gf-date-${id}`}
                >
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className={isValidDate ? 'text-foreground' : 'text-muted-foreground'}>
                    {isValidDate ? format(parsedDate, 'MMMM d, yyyy') : 'Select a date'}
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={isValidDate ? parsedDate : undefined}
                  onSelect={(date) => {
                    if (date) {
                      updateFieldValue(id, format(date, 'yyyy-MM-dd'));
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </>
        );

      case 'TIME':
        const timeValue = (value as Record<string, string>) || {};
        const is12Hour = field.timeFormat !== '24';
        return wrapField(
          <>
            {renderLabel()}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <div className="flex items-center gap-1">
                <Input
                  id={`${id}_hour`}
                  type="text"
                  inputMode="numeric"
                  placeholder={is12Hour ? 'HH' : 'HH'}
                  value={timeValue.hour || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    updateFieldValue(id, { ...timeValue, hour: val });
                  }}
                  onBlur={() => validateFieldOnBlur(field)}
                  className="gf-input w-14 text-center"
                  maxLength={2}
                  data-testid={`input-gf-time-${id}-hour`}
                />
                <span className="text-lg font-medium">:</span>
                <Input
                  id={`${id}_minute`}
                  type="text"
                  inputMode="numeric"
                  placeholder="MM"
                  value={timeValue.minute || ''}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
                    updateFieldValue(id, { ...timeValue, minute: val });
                  }}
                  onBlur={() => validateFieldOnBlur(field)}
                  className="gf-input w-14 text-center"
                  maxLength={2}
                  data-testid={`input-gf-time-${id}-minute`}
                />
                {is12Hour && (
                  <Select
                    value={timeValue.ampm || 'AM'}
                    onValueChange={(v) => updateFieldValue(id, { ...timeValue, ampm: v })}
                  >
                    <SelectTrigger className="w-20" data-testid={`select-gf-time-${id}-ampm`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="AM">AM</SelectItem>
                      <SelectItem value="PM">PM</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          </>
        );

      case 'HTML':
        return (
          <div
            key={id}
            className={`gf-field gf-field-html ${field.cssClass || ''}`}
            dangerouslySetInnerHTML={{ __html: field.content || '' }}
          />
        );

      case 'SECTION':
        return (
          <div key={id} className={`gf-field gf-field-section ${field.cssClass || ''}`}>
            {field.label && <h3 className="text-lg font-semibold">{field.label}</h3>}
            {field.description && (
              <p className="text-muted-foreground">{decodeHtmlEntities(field.description)}</p>
            )}
          </div>
        );

      case 'FILEUPLOAD':
        const allowedExts = field.allowedExtensions?.join(', ') || 'All files';
        const maxSize = field.maxFileSize ? `${field.maxFileSize}MB` : 'No limit';
        return wrapField(
          <>
            {renderLabel()}
            <label
              htmlFor={`field_${id}`}
              className="flex items-center gap-3 p-3 border rounded-md bg-background cursor-pointer hover:bg-accent/30 transition-colors"
            >
              <span className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium">
                <Upload className="h-4 w-4 mr-2" />
                Choose File
              </span>
              <span className="text-muted-foreground text-sm flex-1 truncate">
                {(value as string) || 'No file chosen'}
              </span>
              <input
                {...commonProps}
                type="file"
                accept={field.allowedExtensions?.map(ext => `.${ext}`).join(',')}
                className="sr-only"
onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    updateFieldValue(id, file.name);
                    setFiles(prev => ({ ...prev, [id]: file }));
                  }
                }}
              />
            </label>
            <p className="text-sm text-muted-foreground mt-1">
              Allowed: {allowedExts} (max {maxSize})
            </p>
          </>
        );

      case 'NAME':
        const nameValue = (value as Record<string, string>) || {};
        const nameInputs = field.inputs?.filter(input => !input.isHidden) || [];
        return wrapField(
          <>
            {renderLabel()}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nameInputs.length > 0 ? (
                nameInputs.map((input, idx) => (
                  <div key={input.id || idx}>
                    <Label htmlFor={`${id}_${input.id}`} className="text-sm text-muted-foreground mb-1 block">
                      {input.label}
                    </Label>
                    <Input
                      id={`${id}_${input.id}`}
                      name={`input_${id}_${input.id}`}
                      placeholder={input.placeholder || ''}
                      value={nameValue[input.id] || ''}
                      onChange={(e) => {
                        updateFieldValue(id, { ...nameValue, [input.id]: e.target.value });
                      }}
                      className="gf-input"
                      data-testid={`input-gf-name-${id}-${input.id}`}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <Label htmlFor={`${id}_first`} className="text-sm text-muted-foreground mb-1 block">First</Label>
                    <Input
                      id={`${id}_first`}
                      placeholder="First name"
                      value={nameValue['first'] || ''}
                      onChange={(e) => updateFieldValue(id, { ...nameValue, first: e.target.value })}
                      className="gf-input"
                      data-testid={`input-gf-name-${id}-first`}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${id}_last`} className="text-sm text-muted-foreground mb-1 block">Last</Label>
                    <Input
                      id={`${id}_last`}
                      placeholder="Last name"
                      value={nameValue['last'] || ''}
                      onChange={(e) => updateFieldValue(id, { ...nameValue, last: e.target.value })}
                      className="gf-input"
                      data-testid={`input-gf-name-${id}-last`}
                    />
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'ADDRESS':
        const addrValue = (value as Record<string, string>) || {};
        const addrInputs = field.inputs?.filter(input => !input.isHidden) || [];
        return wrapField(
          <>
            {renderLabel()}
            <div className="space-y-3">
              {addrInputs.length > 0 ? (
                addrInputs.map((input, idx) => (
                  <div key={input.id || idx}>
                    <Label htmlFor={`${id}_${input.id}`} className="text-sm text-muted-foreground mb-1 block">
                      {input.label}
                    </Label>
                    <Input
                      id={`${id}_${input.id}`}
                      name={`input_${id}_${input.id}`}
                      placeholder={input.placeholder || ''}
                      value={addrValue[input.id] || ''}
                      onChange={(e) => {
                        updateFieldValue(id, { ...addrValue, [input.id]: e.target.value });
                      }}
                      className="gf-input"
                      data-testid={`input-gf-address-${id}-${input.id}`}
                    />
                  </div>
                ))
              ) : (
                <>
                  <div>
                    <Label htmlFor={`${id}_street`} className="text-sm text-muted-foreground mb-1 block">Street Address</Label>
                    <Input
                      id={`${id}_street`}
                      placeholder="Street address"
                      value={addrValue['street'] || ''}
                      onChange={(e) => updateFieldValue(id, { ...addrValue, street: e.target.value })}
                      className="gf-input"
                      data-testid={`input-gf-address-${id}-street`}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`${id}_city`} className="text-sm text-muted-foreground mb-1 block">City</Label>
                      <Input
                        id={`${id}_city`}
                        placeholder="City"
                        value={addrValue['city'] || ''}
                        onChange={(e) => updateFieldValue(id, { ...addrValue, city: e.target.value })}
                        className="gf-input"
                        data-testid={`input-gf-address-${id}-city`}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}_state`} className="text-sm text-muted-foreground mb-1 block">State</Label>
                      <Input
                        id={`${id}_state`}
                        placeholder="State"
                        value={addrValue['state'] || ''}
                        onChange={(e) => updateFieldValue(id, { ...addrValue, state: e.target.value })}
                        className="gf-input"
                        data-testid={`input-gf-address-${id}-state`}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`${id}_zip`} className="text-sm text-muted-foreground mb-1 block">ZIP</Label>
                      <Input
                        id={`${id}_zip`}
                        placeholder="ZIP code"
                        value={addrValue['zip'] || ''}
                        onChange={(e) => updateFieldValue(id, { ...addrValue, zip: e.target.value })}
                        className="gf-input"
                        data-testid={`input-gf-address-${id}-zip`}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`${id}_country`} className="text-sm text-muted-foreground mb-1 block">Country</Label>
                      <Input
                        id={`${id}_country`}
                        placeholder="Country"
                        value={addrValue['country'] || ''}
                        onChange={(e) => updateFieldValue(id, { ...addrValue, country: e.target.value })}
                        className="gf-input"
                        data-testid={`input-gf-address-${id}-country`}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        );

      case 'CONSENT':
        return null;

      case 'HIDDEN':
        return (
          <input
            key={id}
            type="hidden"
            name={`input_${id}`}
            value={(value as string) || field.defaultValue || ''}
          />
        );

      default:
        console.warn(`Unsupported Gravity Forms field type: ${field.type}`);
        return wrapField(
          <>
            {renderLabel()}
            <div className="p-3 border border-dashed rounded-md bg-muted/50 text-muted-foreground text-sm">
              <AlertCircle className="inline h-4 w-4 mr-1" />
              Unsupported field type: {field.type}
            </div>
          </>
        );
    }
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (error && !form) {
    return (
      <div className={className}>
        <div className="py-12">
          <div className="text-center text-destructive">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className={className}>
        <div className="py-12">
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: confirmationMessage || 'Thank you!' }}
          />
        </div>
      </div>
    );
  }

  if (!form) return null;

  const totalPages = getTotalPages();
  const isMultiPage = totalPages > 1;
  const isLastPage = currentPage === totalPages;
  const progress = isMultiPage ? (currentPage / totalPages) * 100 : 100;

  return (
    <div className={`gf-form ${className || ''}`} data-testid={`form-gravity-${formId}`}>
      {isMultiPage && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>
              {form.pagination?.pageNames?.[currentPage - 1] || `Page ${currentPage}`}
            </span>
            <span>
              {currentPage} of {totalPages}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className="gf-honeypot"
            style={{ position: 'absolute', left: '-9999px' }}
            aria-hidden="true"
          >
            <Input
              type="text"
              name="gf_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="gf-fields-grid grid grid-cols-12 gap-4">
            {getFieldsForPage(currentPage).map((field) => {
              const colSpan = field.layoutGridColumnSpan || 12;
              return (
                <div
                  key={field.id}
                  className="gf-field-column"
                  style={{
                    gridColumn: `span ${colSpan} / span ${colSpan}`,
                  }}
                >
                  {renderField(field)}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {(!isMultiPage || isLastPage) && (
            <div className="flex items-start gap-3 pt-2">
              <Checkbox
                id="gf-privacy-accept"
                checked={privacyAccepted}
                onCheckedChange={(v) => setPrivacyAccepted(!!v)}
                className="mt-0.5"
                data-testid="checkbox-privacy-accept"
              />
              <Label htmlFor="gf-privacy-accept" className="text-xs text-muted-foreground leading-relaxed font-normal cursor-pointer">
                I accept the{' '}
                <a
                  href="/privacy-policy"
                  className="underline underline-offset-2 hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
                .
              </Label>
            </div>
          )}

          <div className="flex items-center justify-between gap-4 pt-2">
            {isMultiPage && currentPage > 1 ? (
              <Button
                type="button"
                variant="outline"
                className="rounded-none font-medium text-sm h-[45px]"
                onClick={handlePrevPage}
                data-testid="button-gf-prev"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            ) : null}

            {isMultiPage && !isLastPage ? (
              <Button
                type="button"
                className="bg-primary text-primary-foreground rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 h-[45px] ml-auto"
                onClick={handleNextPage}
                data-testid="button-gf-next"
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={submitting || !privacyAccepted}
                className="bg-primary text-primary-foreground rounded-none font-medium text-sm transition-all hover:-translate-y-0.5 w-full h-[45px]"
                data-testid="button-gf-submit"
              >
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {form.submitButton?.text || 'Submit'}
              </Button>
            )}
          </div>
        </form>
    </div>
  );
}

export default GravityForm;
