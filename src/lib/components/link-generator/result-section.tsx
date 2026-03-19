import { AspectRatio, Image, Text } from '@chakra-ui/react';

import { Tooltip } from '@/lib/components/ui/tooltip';

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
        <Tooltip
          content={`${ogImageUrl} [click to copy]`}
          positioning={{ placement: 'top' }}
        >
          <Image
            _hover={{ cursor: 'pointer' }}
            alt={ogImageUrl}
            bgGradient="to-br"
            borderRadius={8}
            gradientFrom="gray.500"
            gradientTo="gray.800"
            height="630"
            onClick={onClick}
            shadow="xl"
            src={generatedImageUrl}
            width="1200"
          />
        </Tooltip>
      </AspectRatio>

      <Tooltip content="click to copy">
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
