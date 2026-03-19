'use client';

import { createListCollection, Portal, Select } from '@chakra-ui/react';
import type { FormControlWrapperProps } from 'lib/components/form/form-control-wrapper';
import FormControlWrapper from 'lib/components/form/form-control-wrapper';
import { useMemo } from 'react';
import {
  type Control,
  Controller,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

export type ControlledSelectProps<T extends FieldValues = FieldValues> =
  FormControlWrapperProps & {
    options: Array<{
      label: string;
      value: string;
    }>;
    placeholder?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    name: FieldPath<T>;
    control: Control<T>;
  };

function SelectComponent({
  options,
  placeholder = 'Select option',
  size = 'md',
  value,
  onChange,
  onBlur,
}: {
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
}) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options,
        itemToString: (item) => item.label,
        itemToValue: (item) => item.value,
      }),
    [options]
  );

  return (
    <Select.Root
      collection={collection}
      onInteractOutside={onBlur}
      onValueChange={(details) => onChange?.(details.value[0] ?? '')}
      size={size}
      value={value ? [value] : []}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={placeholder} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map((item) => (
              <Select.Item item={item} key={item.value}>
                {item.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}

export function ControlledSelect<T extends FieldValues>({
  label,
  errorText,
  helperText,
  invalid,
  required,
  options,
  placeholder,
  size = 'md',
  name,
  control,
}: ControlledSelectProps<T>) {
  return (
    <FormControlWrapper
      errorText={errorText}
      helperText={helperText}
      invalid={invalid}
      label={label}
      required={required}
    >
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <SelectComponent
            onBlur={field.onBlur}
            onChange={field.onChange}
            options={options}
            placeholder={placeholder}
            size={size}
            value={field.value}
          />
        )}
      />
    </FormControlWrapper>
  );
}

export default ControlledSelect;
