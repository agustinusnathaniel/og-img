import type {
  FormControlProps,
  FormErrorMessageProps,
  FormHelperTextProps,
  FormLabelProps,
} from '@chakra-ui/react';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

export type FormControlWrapperProps = {
  label?: FormLabelProps['children'];
  errorText?: FormErrorMessageProps['children'];
  helperText?: FormHelperTextProps['children'];
  children?: ReactNode;
} & Pick<FormControlProps, 'isInvalid' | 'isRequired'>;

const FormControlWrapper = ({
  label,
  errorText,
  helperText,
  isInvalid,
  isRequired,
  children,
}: FormControlWrapperProps) => {
  return (
    <FormControl isInvalid={isInvalid} isRequired={isRequired}>
      {label && <FormLabel>{label}</FormLabel>}

      {children}

      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default FormControlWrapper;
