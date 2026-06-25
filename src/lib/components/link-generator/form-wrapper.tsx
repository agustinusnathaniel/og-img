'use client';

import {
  Button,
  Checkbox,
  ColorPicker,
  Field,
  HStack,
  parseColor,
  Slider,
} from '@chakra-ui/react';
import type { Control, UseFormRegister } from 'react-hook-form';
import { Controller, useWatch } from 'react-hook-form';

import ControlledInput from '@/lib/components/form/controlled-input';
import { ControlledSelect } from '@/lib/components/form/controlled-select';
import { templateOptions } from '@/lib/constants/template-option';
import type { OgImageOption } from '@/lib/types/og-image-option';
import { generateOptions } from '@/lib/utils/generate-options';

type LinkGeneratorFormWrapperProps = {
  register: UseFormRegister<OgImageOption>;
  control: Control<OgImageOption>;
};

const LinkGeneratorFormWrapper = ({
  register,
  control,
}: LinkGeneratorFormWrapperProps) => {
  const template = useWatch({ control, name: 'template' });
  const isColorTemplate = template === 'color';

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

      {isColorTemplate && (
        <>
          <Controller
            control={control}
            name="gradientFrom"
            render={({ field }) => (
              <Field.Root>
                <Field.Label>Gradient start color</Field.Label>
                {field.value ? (
                  <HStack gap={2}>
                    <ColorPicker.Root
                      onValueChange={(details) =>
                        field.onChange(details.value.toString('hex'))
                      }
                      value={parseColor(field.value)}
                    >
                      <ColorPicker.Control>
                        <ColorPicker.ValueSwatch />
                        <ColorPicker.ValueText />
                        <ColorPicker.Trigger />
                      </ColorPicker.Control>
                      <ColorPicker.Positioner>
                        <ColorPicker.Content>
                          <ColorPicker.Area />
                          <ColorPicker.ChannelSlider channel="hue" />
                          <ColorPicker.ChannelInput channel="hex" />
                        </ColorPicker.Content>
                      </ColorPicker.Positioner>
                    </ColorPicker.Root>
                    <Button
                      colorPalette="red"
                      onClick={() => field.onChange(undefined)}
                      size="xs"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </HStack>
                ) : (
                  <Button
                    justifyContent="flex-start"
                    onClick={() => field.onChange('#231e26')}
                    variant="outline"
                    width="full"
                  >
                    + Set gradient start color
                  </Button>
                )}
                <Field.HelperText>
                  Leave empty to use the default gradient image
                </Field.HelperText>
              </Field.Root>
            )}
          />

          <Controller
            control={control}
            name="gradientTo"
            render={({ field }) => (
              <Field.Root>
                <Field.Label>Gradient end color</Field.Label>
                {field.value ? (
                  <HStack gap={2}>
                    <ColorPicker.Root
                      onValueChange={(details) =>
                        field.onChange(details.value.toString('hex'))
                      }
                      value={parseColor(field.value)}
                    >
                      <ColorPicker.Control>
                        <ColorPicker.ValueSwatch />
                        <ColorPicker.ValueText />
                        <ColorPicker.Trigger />
                      </ColorPicker.Control>
                      <ColorPicker.Positioner>
                        <ColorPicker.Content>
                          <ColorPicker.Area />
                          <ColorPicker.ChannelSlider channel="hue" />
                          <ColorPicker.ChannelInput channel="hex" />
                        </ColorPicker.Content>
                      </ColorPicker.Positioner>
                    </ColorPicker.Root>
                    <Button
                      colorPalette="red"
                      onClick={() => field.onChange(undefined)}
                      size="xs"
                      variant="ghost"
                    >
                      Clear
                    </Button>
                  </HStack>
                ) : (
                  <Button
                    justifyContent="flex-start"
                    onClick={() => field.onChange('#102532')}
                    variant="outline"
                    width="full"
                  >
                    + Set gradient end color
                  </Button>
                )}
                <Field.HelperText>
                  Leave empty to use the default gradient image
                </Field.HelperText>
              </Field.Root>
            )}
          />

          <Controller
            control={control}
            name="gradientDegree"
            render={({ field }) => (
              <Field.Root>
                <Field.Label>Gradient angle</Field.Label>
                <Slider.Root
                  max={360}
                  maxW="md"
                  min={0}
                  name={field.name}
                  onValueChange={(details) =>
                    field.onChange(String(details.value[0]))
                  }
                  value={[Number(field.value ?? 45)]}
                  width="full"
                >
                  <Slider.Control>
                    <Slider.Track>
                      <Slider.Range />
                    </Slider.Track>
                    <Slider.Thumbs />
                  </Slider.Control>
                  <Slider.ValueText />
                </Slider.Root>
                <Field.HelperText>
                  Direction of the gradient in degrees (0 = top to bottom, 90 =
                  left to right, 45 = diagonal)
                </Field.HelperText>
              </Field.Root>
            )}
          />
        </>
      )}

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
