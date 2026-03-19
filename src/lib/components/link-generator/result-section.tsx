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
            _hover={{ cursor: 'pointer' }}
            alt={ogImageUrl}
            bgGradient="linear(to-br, gray.500, gray.800)"
            borderRadius={8}
            height="630"
            onClick={onClick}
            shadow="xl"
            src={generatedImageUrl}
            width="1200"
          />
        </Tooltip>
      </AspectRatio>

      <Tooltip label="click to copy">
        <Text
          _hover={{
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
          color="gray"
          fontSize="sm"
          onClick={onClick}
          wordBreak="break-all"
        >
          {ogImageUrl}
        </Text>
      </Tooltip>
    </>
  );
};

export default LinkGeneratorResultSection;
