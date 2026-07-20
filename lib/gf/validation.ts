import type { GfFormField } from './queries';

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export interface ValidationResults {
  [fieldId: string]: ValidationResult;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_REGEX = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
const PHONE_US_REGEX = /^[\d\s\-\(\)\+\.]+$/;
const PHONE_INTERNATIONAL_REGEX = /^[\d\s\-\(\)\+\.]+$/;

export function validateField(
  field: GfFormField,
  value: string | string[] | Record<string, string> | undefined,
  files?: Record<string, File>
): ValidationResult {
  const fieldId = field.databaseId.toString();
  
  const isEmpty = isValueEmpty(value, field.type === 'FILEUPLOAD' ? files?.[fieldId] : undefined);
  
  if (field.isRequired && field.type !== 'TEXTAREA' && isEmpty) {
    return {
      isValid: false,
      message: `${field.label || 'This field'} is required`,
    };
  }
  
  if (isEmpty) {
    return { isValid: true };
  }
  
  switch (field.type) {
    case 'EMAIL':
      return validateEmail(value as string);
      
    case 'PHONE':
      return validatePhone(value as string, field.phoneFormat);
      
    case 'WEBSITE':
      return validateUrl(value as string);
      
    case 'NUMBER':
      return validateNumber(value as string, field.rangeMin, field.rangeMax);
      
    case 'DATE':
      return validateDate(value as string, field.dateFormat);
      
    case 'TIME':
      const is12Hour = field.timeFormat !== '24';
      return validateTime(value as Record<string, string>, is12Hour);
      
    case 'FILEUPLOAD':
      const file = files?.[fieldId];
      return validateFile(file, field.allowedExtensions, field.maxFileSize);
      
    case 'NAME':
    case 'ADDRESS':
      return validateCompositeField(value as Record<string, string>, field);
      
    default:
      return { isValid: true };
  }
}

function isValueEmpty(
  value: string | string[] | Record<string, string> | undefined,
  file?: File
): boolean {
  if (file) return false;
  
  if (value === undefined || value === null) return true;
  
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  
  if (typeof value === 'object') {
    return Object.values(value).every((v) => !v || v.trim() === '');
  }
  
  return !value || value.trim() === '';
}

function validateEmail(value: string): ValidationResult {
  if (!EMAIL_REGEX.test(value)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address',
    };
  }
  return { isValid: true };
}

function validatePhone(value: string, phoneFormat?: string): ValidationResult {
  const cleanValue = value.replace(/\s/g, '');
  
  if (cleanValue.length < 7) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number',
    };
  }
  
  const regex = phoneFormat === 'INTERNATIONAL' ? PHONE_INTERNATIONAL_REGEX : PHONE_US_REGEX;
  
  if (!regex.test(value)) {
    return {
      isValid: false,
      message: 'Phone number can only contain digits, spaces, dashes, parentheses, and +',
    };
  }
  
  const digitCount = value.replace(/\D/g, '').length;
  if (digitCount < 7 || digitCount > 15) {
    return {
      isValid: false,
      message: 'Please enter a valid phone number (7-15 digits)',
    };
  }
  
  return { isValid: true };
}

function validateUrl(value: string): ValidationResult {
  if (!URL_REGEX.test(value)) {
    return {
      isValid: false,
      message: 'Please enter a valid URL (e.g., https://example.com)',
    };
  }
  return { isValid: true };
}

function validateNumber(
  value: string,
  rangeMin?: number,
  rangeMax?: number
): ValidationResult {
  const num = parseFloat(value);
  
  if (isNaN(num)) {
    return {
      isValid: false,
      message: 'Please enter a valid number',
    };
  }
  
  if (rangeMin !== undefined && num < rangeMin) {
    return {
      isValid: false,
      message: `Value must be at least ${rangeMin}`,
    };
  }
  
  if (rangeMax !== undefined && num > rangeMax) {
    return {
      isValid: false,
      message: `Value must be no more than ${rangeMax}`,
    };
  }
  
  return { isValid: true };
}

function validateDate(value: string, dateFormat?: string): ValidationResult {
  const date = new Date(value);
  
  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      message: 'Please enter a valid date',
    };
  }
  
  return { isValid: true };
}

function validateTime(value: Record<string, string>, is12Hour: boolean = true): ValidationResult {
  const hour = parseInt(value.hour || '', 10);
  const minute = parseInt(value.minute || '', 10);
  
  if (is12Hour) {
    if (isNaN(hour) || hour < 1 || hour > 12) {
      return {
        isValid: false,
        message: 'Please enter a valid hour (1-12)',
      };
    }
  } else {
    if (isNaN(hour) || hour < 0 || hour > 23) {
      return {
        isValid: false,
        message: 'Please enter a valid hour (0-23)',
      };
    }
  }
  
  if (isNaN(minute) || minute < 0 || minute > 59) {
    return {
      isValid: false,
      message: 'Please enter a valid minute (0-59)',
    };
  }
  
  if (is12Hour && !value.ampm) {
    return {
      isValid: false,
      message: 'Please select AM or PM',
    };
  }
  
  return { isValid: true };
}

function validateFile(
  file: File | undefined,
  allowedExtensions?: string[],
  maxFileSize?: number
): ValidationResult {
  if (!file) {
    return { isValid: true };
  }
  
  if (allowedExtensions && allowedExtensions.length > 0) {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !allowedExtensions.map(e => e.toLowerCase()).includes(ext)) {
      return {
        isValid: false,
        message: `File type not allowed. Allowed types: ${allowedExtensions.join(', ')}`,
      };
    }
  }
  
  if (maxFileSize) {
    const maxBytes = maxFileSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return {
        isValid: false,
        message: `File size exceeds maximum allowed (${maxFileSize}MB)`,
      };
    }
  }
  
  return { isValid: true };
}

function validateCompositeField(
  value: Record<string, string>,
  field: GfFormField
): ValidationResult {
  if (!field.isRequired) {
    return { isValid: true };
  }
  
  const visibleInputs = field.inputs?.filter(input => !input.isHidden) || [];
  
  for (const input of visibleInputs) {
    const inputValue = value[input.id];
    if (!inputValue || inputValue.trim() === '') {
      return {
        isValid: false,
        message: `${input.label || 'Field'} is required`,
      };
    }
  }
  
  return { isValid: true };
}

export function validateAllFields(
  fields: GfFormField[],
  formValues: Record<string, string | string[] | Record<string, string>>,
  files: Record<string, File>,
  isFieldVisible: (field: GfFormField) => boolean
): ValidationResults {
  const results: ValidationResults = {};
  
  for (const field of fields) {
    if (!isFieldVisible(field)) continue;
    if (field.displayOnly && field.type !== 'HTML' && field.type !== 'SECTION') continue;
    
    const fieldId = field.databaseId.toString();
    const value = formValues[fieldId];
    const result = validateField(field, value, files);
    
    if (!result.isValid) {
      results[fieldId] = result;
    }
  }
  
  return results;
}
