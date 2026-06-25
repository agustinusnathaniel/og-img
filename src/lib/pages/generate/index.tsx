'use client';

import { Button, Grid, Heading, Stack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import LinkGeneratorFormWrapper from '@/lib/components/link-generator/form-wrapper';
import LinkGeneratorResultSection from '@/lib/components/link-generator/result-section';
import { toaster } from '@/lib/components/ui/toaster';
import type { OgImageOption } from '@/lib/types/og-image-option';
import { buildOgImageUrl } from '@/lib/utils/build-og-image-url';

const Generate = () => {
  const { watch, register, control } = useForm<OgImageOption>({
    defaultValues: {
      heading: 'Some Title',
      text: 'Some description',
      template: 'plain',
      gradientDegree: '45',
    },
  });

  const values = watch();

  const ogImageUrl = useMemo(() => {
    return buildOgImageUrl(values);
  }, [values]);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(ogImageUrl);

    toaster.create({
      title: 'OpenGraph image url copied!',
      description: ogImageUrl,
      type: 'success',
    });
  };

  return (
    <Stack gap={8} justifyContent="center" minHeight="70vh">
      <Heading colorPalette="teal" size="3xl">
        Generate OpenGraph image
      </Heading>

      <Grid
        alignItems="center"
        gap={12}
        templateColumns={{
          base: 'repeat(1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Stack gap={6}>
          <LinkGeneratorFormWrapper control={control} register={register} />

          <Button colorPalette="teal" onClick={handleClickCopy}>
            Copy URL
          </Button>
        </Stack>

        <Stack gap={6}>
          <LinkGeneratorResultSection
            generatedImageUrl={ogImageUrl}
            ogImageUrl={ogImageUrl}
            onClick={handleClickCopy}
          />
        </Stack>
      </Grid>
    </Stack>
  );
};

export default Generate;
