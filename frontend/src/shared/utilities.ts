import { WrappedFormUtils } from 'antd/lib/form/Form';

export const hasErrors = (fieldsError: any): boolean => {
  return Object.keys(fieldsError).some((field) => fieldsError[field]);
};

interface HasErrorOptions {
  form: WrappedFormUtils;
  field: string;
}

export const hasError = ({
  form,
  field
}: HasErrorOptions): boolean | Object[] => {
  return form.isFieldTouched(field) && form.getFieldError(field);
};

type ValidateStatus =
  | ''
  | 'error'
  | 'success'
  | 'warning'
  | 'validating'
  | undefined;

interface ValidateStatusOptions extends HasErrorOptions {
  status?: ValidateStatus;
}

export const getValidateStatus = ({
  form,
  field,
  status = 'error'
}: ValidateStatusOptions): ValidateStatus => {
  return hasError({ form, field }) ? status : '';
};
