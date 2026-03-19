'use client';

import { Checkbox } from '@chakra-ui/react';
import ControlledInput from 'lib/components/form/controlled-input';
import { ControlledSelect } from 'lib/components/form/controlled-select';
import { templateOptions } from 'lib/constants/template-option';
import type { OgImageOption } from 'lib/types/og-image-option';
import { generateOptions } from 'lib/utils/generate-options';
import type { Control, UseFormRegister } from 'react-hook-form';

type LinkGeneratorFormWrapperProps = {
  register: UseFormRegister<OgImageOption>;
  control: Control<OgImageOption>;
};

const LinkGeneratorFormWrapper = ({
  register,
  control,
}: LinkGeneratorFormWrapperProps) => {
  return (
    <>
      <ControlledInput
        {...register('heading')}
        label="Heading"
        placeholder="Heading text"
        size="lg"
      />
      <ControlledInput
        {...register('text')}
        label="Text"
        placeholder="Description text"
        size="sm"
      />
      <ControlledSelect
        control={control}
        label="Template"
        name="template"
        options={generateOptions(templateOptions)}
        placeholder="Select template"
        size="md"
      />
      <Checkbox.Root {...register('center')}>
        <Checkbox.HiddenInput />
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        <Checkbox.Label>center</Checkbox.Label>
      </Checkbox.Root>
    </>
  );
};

export default LinkGeneratorFormWrapper;
