import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface GravityFormProps {
  formId: number | string;
  className?: string;
  onSuccess?: (result: GravityFormResult) => void;
  onError?: (error: Error) => void;
}

interface GravityFormField {
  id: string | number;
  type: string;
  label: string;
  isRequired: boolean;
  placeholder?: string;
  choices?: Array<{ text: string; value: string; isSelected?: boolean }>;
  inputs?: Array<{ id: string; label: string; name?: string }>;
  description?: string;
  maxLength?: number;
  defaultValue?: string;
  cssClass?: string;
  visibility?: string;
}

interface GravityFormData {
  id: number;
  title: string;
  description?: string;
  fields: GravityFormField[];
  button?: { text: string };
  confirmations?: Record<string, { message: string }>;
}

interface GravityFormResult {
  is_valid: boolean;
  confirmation_message?: string;
  confirmation_type?: string;
  validation_messages?: Record<string, string>;
}

export function GravityForm({ formId, className, onSuccess, onError }: GravityFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);

  const { data: formData, isLoading: formLoading, error: formError } = useQuery<GravityFormData>({
    queryKey: ['/api/gravity-forms', formId],
  });

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm();

  const submitMutation = useMutation({
    mutationFn: async (data: Record<string, unknown>) => {
      const response = await apiRequest('POST', `/api/gravity-forms/${formId}/submit`, data);
      return response.json();
    },
    onSuccess: (result: GravityFormResult) => {
      if (result.is_valid) {
        setSubmitted(true);
        const message = result.confirmation_message?.replace(/<[^>]*>/g, '') || 'Thank you for your submission!';
        setConfirmationMessage(message);
        reset();
        onSuccess?.(result);
      } else {
        console.error('Validation errors:', result.validation_messages);
      }
    },
    onError: (error: Error) => {
      console.error('Form submission error:', error);
      onError?.(error);
    },
  });

  const onSubmit = (data: Record<string, unknown>) => {
    const formattedData: Record<string, unknown> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formattedData[key] = value;
      }
    });

    submitMutation.mutate(formattedData);
  };

  if (formLoading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (formError || !formData) {
    return (
      <Card className={className}>
        <CardContent className="py-8">
          <div className="flex items-center gap-3 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <p>Unable to load form. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (submitted && confirmationMessage) {
    return (
      <Card className={className}>
        <CardContent className="py-12">
          <div className="flex flex-col items-center text-center gap-4">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-lg">{confirmationMessage}</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSubmitted(false);
                setConfirmationMessage(null);
              }}
              data-testid="button-submit-another"
            >
              Submit Another Response
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const renderField = (field: GravityFormField) => {
    const inputKey = `input_${field.id}`;
    const isHidden = field.visibility === 'hidden' || field.type === 'hidden';

    if (isHidden) {
      return (
        <input
          key={field.id}
          type="hidden"
          {...register(inputKey)}
          defaultValue={field.defaultValue || ''}
        />
      );
    }

    const validationMessages = submitMutation.data?.validation_messages;
    const fieldError = validationMessages?.[String(field.id)];

    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'website':
      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={inputKey}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={inputKey}
              type={field.type === 'email' ? 'email' : field.type === 'phone' ? 'tel' : field.type === 'website' ? 'url' : field.type === 'number' ? 'number' : 'text'}
              placeholder={field.placeholder || ''}
              {...register(inputKey, { required: field.isRequired })}
              className={fieldError ? 'border-destructive' : ''}
              data-testid={`input-${field.type}-${field.id}`}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError}</p>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={inputKey}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={inputKey}
              placeholder={field.placeholder || ''}
              {...register(inputKey, { required: field.isRequired })}
              className={fieldError ? 'border-destructive' : ''}
              rows={5}
              data-testid={`textarea-${field.id}`}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError}</p>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={inputKey}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
              onValueChange={(value) => setValue(inputKey, value)}
              defaultValue={field.choices?.find(c => c.isSelected)?.value || ''}
            >
              <SelectTrigger className={fieldError ? 'border-destructive' : ''} data-testid={`select-${field.id}`}>
                <SelectValue placeholder={field.placeholder || 'Select an option'} />
              </SelectTrigger>
              <SelectContent>
                {field.choices?.map((choice, idx) => (
                  <SelectItem key={idx} value={choice.value || choice.text}>
                    {choice.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError}</p>
            )}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-3">
            <Label>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <RadioGroup
              onValueChange={(value) => setValue(inputKey, value)}
              defaultValue={field.choices?.find(c => c.isSelected)?.value || ''}
              className="space-y-2"
            >
              {field.choices?.map((choice, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={choice.value || choice.text} 
                    id={`${inputKey}_${idx}`}
                    data-testid={`radio-${field.id}-${idx}`}
                  />
                  <Label htmlFor={`${inputKey}_${idx}`} className="font-normal">
                    {choice.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError}</p>
            )}
          </div>
        );

      case 'checkbox':
        if (field.choices && field.choices.length > 1) {
          return (
            <div key={field.id} className="space-y-3">
              <Label>
                {field.label}
                {field.isRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
              <div className="space-y-2">
                {field.choices.map((choice, idx) => {
                  const choiceKey = `${inputKey}_${idx + 1}`;
                  return (
                    <div key={idx} className="flex items-center space-x-2">
                      <Checkbox
                        id={choiceKey}
                        onCheckedChange={(checked) => setValue(choiceKey, checked ? choice.value || '1' : '')}
                        data-testid={`checkbox-${field.id}-${idx}`}
                      />
                      <Label htmlFor={choiceKey} className="font-normal">
                        {choice.text}
                      </Label>
                    </div>
                  );
                })}
              </div>
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
              {fieldError && (
                <p className="text-sm text-destructive">{fieldError}</p>
              )}
            </div>
          );
        }
        return (
          <div key={field.id} className="flex items-start space-x-2">
            <Checkbox
              id={inputKey}
              onCheckedChange={(checked) => setValue(inputKey, checked ? '1' : '')}
              data-testid={`checkbox-${field.id}`}
            />
            <div className="space-y-1">
              <Label htmlFor={inputKey} className="font-normal">
                {field.label}
                {field.isRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
              {fieldError && (
                <p className="text-sm text-destructive">{fieldError}</p>
              )}
            </div>
          </div>
        );

      case 'name':
        if (field.inputs && field.inputs.length > 0) {
          return (
            <div key={field.id} className="space-y-2">
              <Label>
                {field.label}
                {field.isRequired && <span className="text-destructive ml-1">*</span>}
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field.inputs.map((input) => (
                  <div key={input.id} className="space-y-1">
                    <Input
                      id={`input_${input.id}`}
                      placeholder={input.label}
                      {...register(`input_${input.id}`, { required: field.isRequired })}
                      data-testid={`input-name-${input.id}`}
                    />
                    <p className="text-xs text-muted-foreground">{input.label}</p>
                  </div>
                ))}
              </div>
              {fieldError && (
                <p className="text-sm text-destructive">{fieldError}</p>
              )}
            </div>
          );
        }
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={inputKey}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={inputKey}
              placeholder={field.placeholder || ''}
              {...register(inputKey, { required: field.isRequired })}
              className={fieldError ? 'border-destructive' : ''}
              data-testid={`input-name-${field.id}`}
            />
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError}</p>
            )}
          </div>
        );

      case 'html':
      case 'section':
        return (
          <div 
            key={field.id} 
            className="py-2"
            dangerouslySetInnerHTML={{ __html: field.label || '' }}
          />
        );

      default:
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={inputKey}>
              {field.label}
              {field.isRequired && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={inputKey}
              placeholder={field.placeholder || ''}
              {...register(inputKey, { required: field.isRequired })}
              className={fieldError ? 'border-destructive' : ''}
              data-testid={`input-${field.type}-${field.id}`}
            />
            {field.description && (
              <p className="text-sm text-muted-foreground">{field.description}</p>
            )}
            {fieldError && (
              <p className="text-sm text-destructive">{fieldError}</p>
            )}
          </div>
        );
    }
  };

  return (
    <Card className={className}>
      <CardContent className="pt-6">
        {formData.title && (
          <h2 className="text-2xl font-bold mb-2" data-testid="text-form-title">{formData.title}</h2>
        )}
        {formData.description && (
          <p className="text-muted-foreground mb-6" data-testid="text-form-description">{formData.description}</p>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formData.fields?.map(renderField)}
          
          <Button 
            type="submit" 
            disabled={submitMutation.isPending}
            className="w-full sm:w-auto"
            data-testid="button-submit-form"
          >
            {submitMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              formData.button?.text || 'Submit'
            )}
          </Button>
          
          {submitMutation.isError && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>There was an error submitting the form. Please try again.</span>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
