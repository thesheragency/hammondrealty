import type { GfConditionalLogic } from './queries';

export type FormValues = Record<string, string | string[] | Record<string, string>>;

function getFieldValue(fieldId: number, formValues: FormValues): string {
  const value = formValues[fieldId.toString()] ?? formValues[`input_${fieldId}`] ?? '';
  if (Array.isArray(value)) {
    return value.join(',');
  }
  if (typeof value === 'object') {
    return Object.values(value).join(' ').trim();
  }
  return String(value);
}

function evaluateRule(
  ruleFieldId: number,
  operator: string,
  ruleValue: string,
  formValues: FormValues
): boolean {
  const fieldValue = getFieldValue(ruleFieldId, formValues).toLowerCase();
  const compareValue = ruleValue.toLowerCase();

  switch (operator.toUpperCase()) {
    case 'IS':
      return fieldValue === compareValue;
    case 'IS_NOT':
    case 'ISNOT':
      return fieldValue !== compareValue;
    case 'GREATER_THAN':
    case '>':
      return parseFloat(fieldValue) > parseFloat(compareValue);
    case 'LESS_THAN':
    case '<':
      return parseFloat(fieldValue) < parseFloat(compareValue);
    case 'CONTAINS':
      return fieldValue.includes(compareValue);
    case 'STARTS_WITH':
    case 'STARTSWITH':
      return fieldValue.startsWith(compareValue);
    case 'ENDS_WITH':
    case 'ENDSWITH':
      return fieldValue.endsWith(compareValue);
    default:
      return fieldValue === compareValue;
  }
}

export function evaluateConditionalLogic(
  conditionalLogic: GfConditionalLogic | undefined | null,
  formValues: FormValues
): boolean {
  if (!conditionalLogic || !conditionalLogic.rules || conditionalLogic.rules.length === 0) {
    return true;
  }

  const { actionType, logicType, rules } = conditionalLogic;

  const ruleResults = rules.map((rule) =>
    evaluateRule(rule.fieldId, rule.operator, rule.value, formValues)
  );

  let conditionMet: boolean;
  if (logicType === 'ALL') {
    conditionMet = ruleResults.every((result) => result);
  } else {
    conditionMet = ruleResults.some((result) => result);
  }

  if (actionType === 'SHOW') {
    return conditionMet;
  } else {
    return !conditionMet;
  }
}
