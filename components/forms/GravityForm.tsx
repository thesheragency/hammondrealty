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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Loader2, ChevronLeft, ChevronRight, AlertCircle, Upload } from 'lucide-react';
import type { GfForm, GfFormField, GfChoice } from '@/lib/gf/queries';
import { evaluateConditionalLogic, type FormValues } from '@/lib/gf/conditionalLogic';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState('');

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

  const initializeFormValues = (formData: GfForm) => {
    const values: Record<string, FieldValue> = {};
    formData.formFields.nodes.forEach((field) => {
      const id = field.databaseId.toString();
      if (field.type === 'CHECKBOX' || field.type === 'MULTISELECT' || field.type === 'MULTI_CHOICE') {
        values[id] = [];
      } else if (field.type === 'NAME' || field.type === 'ADDRESS') {
        values[id] = {};
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
    const errors: Record<string, string> = {};
    const fields = getFieldsForPage(currentPage);

    fields.forEach((field) => {
      if (!isFieldVisible(field)) return;
      if (!field.isRequired) return;

      const value = formValues[field.databaseId.toString()];
      let isEmpty = false;

      if (Array.isArray(value)) {
        isEmpty = value.length === 0;
      } else if (typeof value === 'object') {
        isEmpty = Object.values(value).every((v) => !v);
      } else {
        isEmpty = !value || value.trim() === '';
      }

      if (isEmpty) {
        errors[field.databaseId.toString()] = `${field.label || 'This field'} is required`;
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }, [currentPage, formValues, getFieldsForPage, isFieldVisible]);

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
      const fieldValues = Object.entries(formValues)
        .filter(([, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === 'object') return Object.values(value).some((v) => v);
          return value !== '';
        })
        .map(([id, value]) => {
          const field = form?.formFields.nodes.find((f) => f.databaseId.toString() === id);
          if (!field) return { id: parseInt(id), value: String(value) };

          if (field.type === 'CHECKBOX' && Array.isArray(value)) {
            return {
              id: parseInt(id),
              checkboxValues: value.map((v, idx) => ({
                inputId: parseFloat(`${id}.${idx + 1}`),
                value: v,
              })),
            };
          }

          if (field.type === 'EMAIL' && typeof value === 'string') {
            return {
              id: parseInt(id),
              emailValues: { value },
            };
          }

          if (field.type === 'NAME' && typeof value === 'object' && !Array.isArray(value)) {
            // Map input IDs to nameValues keys (GF uses .2=prefix, .3=first, .4=middle, .6=last, .8=suffix)
            const nameMap: Record<string, string> = {};
            for (const [inputId, val] of Object.entries(value)) {
              if (!val) continue;
              const suffix = inputId.split('.')[1];
              switch (suffix) {
                case '2': nameMap.prefix = val; break;
                case '3': nameMap.first = val; break;
                case '4': nameMap.middle = val; break;
                case '6': nameMap.last = val; break;
                case '8': nameMap.suffix = val; break;
                default:
                  // Fallback for keys already named properly (first, last, etc)
                  if (['prefix', 'first', 'middle', 'last', 'suffix'].includes(inputId)) {
                    nameMap[inputId] = val;
                  }
              }
            }
            return {
              id: parseInt(id),
              nameValues: nameMap,
            };
          }

          if (field.type === 'ADDRESS' && typeof value === 'object' && !Array.isArray(value)) {
            // Map input IDs to addressValues keys (GF uses .1=street, .2=line2, .3=city, .4=state, .5=zip, .6=country)
            const addrMap: Record<string, string> = {};
            for (const [inputId, val] of Object.entries(value)) {
              if (!val) continue;
              const suffix = inputId.split('.')[1];
              switch (suffix) {
                case '1': addrMap.street = val; break;
                case '2': addrMap.lineTwo = val; break;
                case '3': addrMap.city = val; break;
                case '4': addrMap.state = val; break;
                case '5': addrMap.zip = val; break;
                case '6': addrMap.country = val; break;
                default:
                  // Fallback for keys already named properly
                  if (['street', 'lineTwo', 'city', 'state', 'zip', 'country'].includes(inputId)) {
                    addrMap[inputId] = val;
                  }
              }
            }
            return {
              id: parseInt(id),
              addressValues: addrMap,
            };
          }

          return { id: parseInt(id), value: String(value) };
        });

      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formId, fieldValues, gf_hp: honeypot }),
      });

      const data = await res.json();

      if (!res.ok || data.errors?.length > 0) {
        const errorMessages = data.errors?.map((e: { message: string }) => e.message).join(', ');
        throw new Error(errorMessages || data.error || 'Submission failed');
      }

      setSubmitted(true);
      setConfirmationMessage(data.confirmation?.message || 'Thank you for your submission.');
      onSuccess?.(data.confirmation);
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
        {field.isRequired && <span className="text-destructive ml-1">*</span>}
      </Label>
    );

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
      case 'PHONE':
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
              type={field.type === 'PHONE' ? 'tel' : field.type === 'WEBSITE' ? 'url' : 'text'}
              placeholder={field.placeholder}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
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
              placeholder={field.placeholder}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
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
              placeholder={field.placeholder}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
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
              placeholder={field.placeholder}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
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
            {renderLabel()}
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
        return wrapField(
          <>
            {renderLabel()}
            <Input
              {...commonProps}
              type="date"
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(id, e.target.value)}
              className="gf-input"
            />
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
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (error && !form) {
    return (
      <Card className={className}>
        <CardContent className="py-12">
          <div className="text-center text-destructive">
            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (submitted) {
    return (
      <Card className={className}>
        <CardContent className="py-12">
          <div
            className="text-center"
            dangerouslySetInnerHTML={{ __html: confirmationMessage || 'Thank you!' }}
          />
        </CardContent>
      </Card>
    );
  }

  if (!form) return null;

  const totalPages = getTotalPages();
  const isMultiPage = totalPages > 1;
  const isLastPage = currentPage === totalPages;
  const progress = isMultiPage ? (currentPage / totalPages) * 100 : 100;

  return (
    <Card className={`gf-form ${className || ''}`} data-testid={`form-gravity-${formId}`}>
      <CardHeader>
        <CardTitle>{form.title}</CardTitle>
        {form.description && <CardDescription>{decodeHtmlEntities(form.description)}</CardDescription>}
        {isMultiPage && (
          <div className="mt-4">
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
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="flex items-center justify-between gap-4 pt-4">
            {isMultiPage && currentPage > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevPage}
                data-testid="button-gf-prev"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
            ) : (
              <div />
            )}

            {isMultiPage && !isLastPage ? (
              <Button type="button" onClick={handleNextPage} data-testid="button-gf-next">
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button type="submit" disabled={submitting} data-testid="button-gf-submit">
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                {form.submitButton?.text || 'Submit'}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default GravityForm;
