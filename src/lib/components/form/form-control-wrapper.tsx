import {
  Field,
  type FieldErrorTextProps,
  type FieldHelperTextProps,
  type FieldLabelProps,
  type FieldRootProps,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

export type FormControlWrapperProps = {
  label?: FieldLabelProps['children'];
  errorText?: FieldErrorTextProps['children'];
  helperText?: FieldHelperTextProps['children'];
  children?: ReactNode;
} & Pick<FieldRootProps, 'invalid' | 'required'>;

const FormControlWrapper = ({
  label,
  errorText,
  helperText,
  invalid,
  required,
  children,
}: FormControlWrapperProps) => {
  return (
    <Field.Root invalid={invalid} required={required}>
      {label && <Field.Label>{label}</Field.Label>}

      {children}

      {errorText && <Field.ErrorText>{errorText}</Field.ErrorText>}
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

export default FormControlWrapper;
