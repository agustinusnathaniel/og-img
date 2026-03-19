import { Checkbox } from '@chakra-ui/react';
import ControlledInput from 'lib/components/shared/form/controlled-input';
import ControlledSelect from 'lib/components/shared/form/controlled-select';
import { templateOptions } from 'lib/constants/template-option';
import type { OgImageOption } from 'lib/types/og-image-option';
import { generateOptions } from 'lib/utils/generate-options';
import type { UseFormRegister } from 'react-hook-form';

type LinkGeneratorFormWrapperProps = {
  register: UseFormRegister<OgImageOption>;
};

const LinkGeneratorFormWrapper = ({
  register,
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
        {...register('template')}
        label="Template"
        options={generateOptions(templateOptions)}
      />
      <Checkbox {...register('center')}>center</Checkbox>
    </>
  );
};

export default LinkGeneratorFormWrapper;
