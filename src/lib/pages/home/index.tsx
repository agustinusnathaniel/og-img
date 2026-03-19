import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
  return (
    <Stack
      justifyContent="center"
      mb={8}
      minHeight="70vh"
      textAlign="center"
      w="full"
    >
      <Heading>🖼️ og-img</Heading>
      <Text>Edge service to generate embeddable dynamic OpenGraph image</Text>

      <Flex justifyContent="center">
        <Button as={Link} colorScheme="teal" href="/generate">
          Generate
        </Button>
      </Flex>
    </Stack>
  );
};

export default Home;
