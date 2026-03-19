import {
  Box,
  Button,
  Link as ChakraLink,
  Heading,
  Image,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Image alt="Error 404 not found Illustration" src="/404 Error-pana.svg" />
      <Text fontSize="xs" textAlign="center">
        <ChakraLink href="https://stories.freepik.com/web" isExternal>
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box marginTop={4} textAlign="center">
          <Text>It&apos;s Okay!</Text>
          <Button
            as={Link}
            backgroundColor={colorMode === 'light' ? 'gray.300' : 'teal.500'}
            href="/"
          >
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
