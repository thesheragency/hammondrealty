import { gql } from 'graphql-request';

export const GF_FORM_FIELDS_FRAGMENT = gql`
  fragment GfFormFields on GfForm {
    formId
    databaseId
    title
    description
    cssClass
    labelPlacement
    descriptionPlacement
    button {
      text
      type
    }
    confirmations {
      id
      isDefault
      message
      type
      url
    }
    pagination {
      type
      pages
      pageNames
      progressbarCompletionText
    }
    formFields(first: 500) {
      nodes {
        id
        databaseId
        type
        layoutGridColumnSpan
        layoutSpacerGridColumnSpan
        pageNumber
        visibility
        displayOnly
        inputType
        ... on GfFieldWithLabelSetting {
          label
        }
        ... on GfFieldWithDescriptionSetting {
          description
        }
        ... on GfFieldWithPlaceholderSetting {
          placeholder
        }
        ... on GfFieldWithRequiredSetting {
          isRequired
        }
        ... on GfFieldWithDefaultValueSetting {
          defaultValue
        }
        ... on GfFieldWithCssClassSetting {
          cssClass
        }
        ... on GfFieldWithMaxLengthSetting {
          maxLength
        }
        ... on GfFieldWithChoicesSetting {
          choices {
            text
            value
            isSelected
          }
        }
        ... on GfFieldWithConditionalLogicSetting {
          conditionalLogic {
            actionType
            logicType
            rules {
              fieldId
              operator
              value
            }
          }
        }
        ... on TextField {
          inputType
        }
        ... on TextAreaField {
          inputType
        }
        ... on EmailField {
          hasEmailConfirmation
        }
        ... on NumberField {
          rangeMin
          rangeMax
        }
        ... on PhoneField {
          phoneFormat
        }
        ... on SelectField {
          defaultValue
        }
        ... on RadioField {
          enableOtherChoice
        }
        ... on CheckboxField {
          hasSelectAll
        }
        ... on DateField {
          dateFormat
          dateType
          calendarIconType
        }
        ... on FileUploadField {
          allowedExtensions
          maxFileSize
          maxFiles
        }
        ... on NameField {
          inputs {
            id
            label
            name
            placeholder
            isHidden
          }
        }
        ... on AddressField {
          inputs {
            id
            label
            name
            placeholder
            isHidden
          }
        }
        ... on PageField {
          nextButton {
            text
            type
          }
          previousButton {
            text
            type
          }
        }
        ... on HtmlField {
          content
        }
        ... on SectionField {
          label
          description
        }
      }
    }
  }
`;

export const GET_GF_FORM_QUERY = gql`
  ${GF_FORM_FIELDS_FRAGMENT}
  query GetGfForm($formId: ID!, $idType: FormIdTypeEnum = DATABASE_ID) {
    gfForm(id: $formId, idType: $idType) {
      ...GfFormFields
    }
  }
`;

export interface GfChoice {
  text: string;
  value: string;
  isSelected: boolean;
}

export interface GfConditionalLogicRule {
  fieldId: number;
  operator: string;
  value: string;
}

export interface GfConditionalLogic {
  actionType: 'SHOW' | 'HIDE';
  logicType: 'ALL' | 'ANY';
  rules: GfConditionalLogicRule[];
}

export interface GfFieldInput {
  id: string;
  label: string;
  name: string;
  placeholder?: string;
  isHidden?: boolean;
}

export interface GfButton {
  text: string;
  type: string;
}

export interface GfFormField {
  id: string;
  databaseId: number;
  type: string;
  layoutGridColumnSpan?: number;
  layoutSpacerGridColumnSpan?: number;
  pageNumber?: number;
  visibility?: string;
  displayOnly?: boolean;
  inputType?: string;
  label?: string;
  description?: string;
  placeholder?: string;
  isRequired?: boolean;
  defaultValue?: string;
  cssClass?: string;
  maxLength?: number;
  choices?: GfChoice[];
  conditionalLogic?: GfConditionalLogic;
  hasEmailConfirmation?: boolean;
  rangeMin?: number;
  rangeMax?: number;
  phoneFormat?: string;
  enableOtherChoice?: boolean;
  hasSelectAll?: boolean;
  dateFormat?: string;
  dateType?: string;
  calendarIconType?: string;
  allowedExtensions?: string[];
  maxFileSize?: number;
  maxFiles?: number;
  inputs?: GfFieldInput[];
  nextButton?: GfButton;
  previousButton?: GfButton;
  content?: string;
}

export interface GfPagination {
  type: string;
  pages?: string[];
  pageNames?: string[];
  progressbarCompletionText?: string;
}

export interface GfConfirmation {
  id: string;
  isDefault: boolean;
  message?: string;
  type: string;
  url?: string;
}

export interface GfForm {
  formId: number;
  databaseId: number;
  title: string;
  description?: string;
  cssClass?: string;
  labelPlacement?: string;
  descriptionPlacement?: string;
  button: GfButton;
  confirmations: GfConfirmation[];
  pagination?: GfPagination;
  formFields: {
    nodes: GfFormField[];
  };
}

export interface GetGfFormResponse {
  gfForm: GfForm | null;
}
