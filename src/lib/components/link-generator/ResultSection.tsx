import { AspectRatio, Image, Text, Tooltip } from '@chakra-ui/react';

type LinkGeneratorResultSectionProps = {
  generatedImageUrl: string;
  ogImageUrl: string;
  onClick: () => void;
};

const LinkGeneratorResultSection = ({
  generatedImageUrl,
  ogImageUrl,
  onClick,
}: LinkGeneratorResultSectionProps) => {
  return (
    <>
      <AspectRatio ratio={1200 / 630}>
        <Tooltip label={`${ogImageUrl} [click to copy]`} placement="top">
          <Image
            borderRadius={8}
            shadow="xl"
            src={generatedImageUrl}
            width="1200"
            height="630"
            bgGradient="linear(to-br, gray.500, gray.800)"
            onClick={onClick}
            _hover={{ cursor: 'pointer' }}
            alt={ogImageUrl}
          />
        </Tooltip>
      </AspectRatio>

      <Tooltip label="click to copy">
        <Text
          onClick={onClick}
          wordBreak="break-all"
          _hover={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          fontSize="sm"
          color="gray"
        >
          {ogImageUrl}
        </Text>
      </Tooltip>
    </>
  );
};

export default LinkGeneratorResultSection;
