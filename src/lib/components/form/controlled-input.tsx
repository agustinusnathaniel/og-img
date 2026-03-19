import type { InputProps } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import type { FormControlWrapperProps } from 'lib/components/form/form-control-wrapper';
import FormControlWrapper from 'lib/components/form/form-control-wrapper';
import { forwardRef } from 'react';

export type ControlledInputProps = FormControlWrapperProps & InputProps;

const ControlledInput = forwardRef<HTMLInputElement, ControlledInputProps>(
  (
    {
      label,
      errorText,
      helperText,
      invalid,
      required,
      ...inputProps
    }: ControlledInputProps,
    ref
  ) => {
    return (
      <FormControlWrapper
        errorText={errorText}
        helperText={helperText}
        invalid={invalid}
        label={label}
        required={required}
      >
        <Input borderRadius={12} ref={ref} variant="subtle" {...inputProps} />
      </FormControlWrapper>
    );
  }
);
export default ControlledInput;
