import { Button, Grid, Heading, Stack, useToast } from '@chakra-ui/react';
import LinkGeneratorFormWrapper from 'lib/components/link-generator/form-wrapper';
import LinkGeneratorResultSection from 'lib/components/link-generator/result-section';
import type { OgImageOption } from 'lib/types/og-image-option';
import { buildOgImageUrl } from 'lib/utils/build-og-image-url';
import type { NextPage } from 'next';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

const Generate: NextPage = () => {
  const toast = useToast();
  const { watch, register } = useForm<OgImageOption>({
    defaultValues: {
      heading: 'Some Title',
      text: 'Some description',
      template: 'plain',
    },
  });

  const values = watch();

  const ogImageUrl = useMemo(() => {
    return buildOgImageUrl(values);
  }, [values]);

  const handleClickCopy = () => {
    navigator.clipboard.writeText(ogImageUrl);

    toast({
      status: 'success',
      title: 'OpenGraph image url copied!',
      description: ogImageUrl,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Stack justifyContent="center" minHeight="70vh" spacing={8}>
      <Heading color="teal" size="xl">
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
        <Stack spacing={6}>
          <LinkGeneratorFormWrapper register={register} />

          <Button colorScheme="teal" onClick={handleClickCopy}>
            Copy URL
          </Button>
        </Stack>

        <Stack spacing={6}>
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
