import { gql } from 'graphql-request';

export const SUBMIT_GF_FORM_MUTATION = gql`
  mutation SubmitGfForm($formId: ID!, $fieldValues: [FormFieldValuesInput]!, $saveAsDraft: Boolean) {
    submitGfForm(
      input: {
        id: $formId
        fieldValues: $fieldValues
        saveAsDraft: $saveAsDraft
      }
    ) {
      confirmation {
        message
        type
        url
      }
      errors {
        id
        message
      }
      entry {
        id
        ... on GfSubmittedEntry {
          databaseId
          dateCreated
        }
      }
    }
  }
`;

export interface FieldValueInput {
  id: number;
  value?: string;
  values?: string[];
  emailValues?: {
    value: string;
    confirmationValue?: string;
  };
  nameValues?: {
    prefix?: string;
    first?: string;
    middle?: string;
    last?: string;
    suffix?: string;
  };
  addressValues?: {
    street?: string;
    lineTwo?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  checkboxValues?: Array<{
    inputId: number;
    value: string;
  }>;
  fileUploadValues?: Array<{
    name: string;
    type: string;
    size: number;
    basePath: string;
  }>;
}

export interface SubmitGfFormInput {
  formId: string | number;
  fieldValues: FieldValueInput[];
  saveAsDraft?: boolean;
}

export interface GfSubmissionError {
  id: string;
  message: string;
}

export interface GfSubmissionConfirmation {
  message?: string;
  type: string;
  url?: string;
}

export interface GfSubmissionEntry {
  id: string;
  databaseId?: number;
  dateCreated?: string;
}

export interface SubmitGfFormResponse {
  submitGfForm: {
    confirmation?: GfSubmissionConfirmation;
    errors?: GfSubmissionError[];
    entry?: GfSubmissionEntry;
  };
}
