import type { InputProps } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import type { FormControlWrapperProps } from 'lib/components/shared/form/form-control-wrapper';
import FormControlWrapper from 'lib/components/shared/form/form-control-wrapper';
import { forwardRef } from 'react';

export type ControlledInputProps = FormControlWrapperProps & InputProps;

const ControlledInput = forwardRef(
  (
    {
      label,
      errorText,
      helperText,
      isInvalid,
      isRequired,
      ...inputProps
    }: ControlledInputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <FormControlWrapper
        errorText={errorText}
        helperText={helperText}
        isInvalid={isInvalid}
        isRequired={isRequired}
        label={label}
      >
        <Input
          borderRadius={12}
          ref={ref}
          variant="filled"
          {...inputProps}
          isRequired={isRequired}
        />
      </FormControlWrapper>
    );
  }
);
export default ControlledInput;
