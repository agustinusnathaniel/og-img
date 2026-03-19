import type { SelectProps } from '@chakra-ui/react';
import { Select } from '@chakra-ui/react';
import type { FormControlWrapperProps } from 'lib/components/shared/form/form-control-wrapper';
import FormControlWrapper from 'lib/components/shared/form/form-control-wrapper';
import { forwardRef } from 'react';

export type ControlledSelectProps = FormControlWrapperProps &
  SelectProps & {
    options: Array<{
      label: string;
      value: string | number;
    }>;
  };

const ControlledSelect = forwardRef(
  (
    {
      label,
      errorText,
      helperText,
      isInvalid,
      isRequired,
      options,
      ...selectProps
    }: ControlledSelectProps,
    ref: React.ForwardedRef<HTMLSelectElement>
  ) => {
    return (
      <FormControlWrapper
        errorText={errorText}
        helperText={helperText}
        isInvalid={isInvalid}
        isRequired={isRequired}
        label={label}
      >
        <Select
          borderRadius={12}
          ref={ref}
          variant="filled"
          {...selectProps}
          isRequired={isRequired}
        >
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </Select>
      </FormControlWrapper>
    );
  }
);
export default ControlledSelect;
