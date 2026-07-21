import { Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => (
  <Stack
    justifyContent="center"
    mb={8}
    minHeight="70vh"
    textAlign="center"
    w="full"
  >
    <Heading size="4xl">🖼️ og-img</Heading>
    <Text>Edge service to generate embeddable dynamic OpenGraph image</Text>

    <Flex justifyContent="center">
      <Link
        href="/generate"
        style={{
          backgroundColor: 'var(--chakra-colors-teal-500)',
          borderRadius: '8px',
          color: 'white',
          display: 'inline-block',
          padding: '8px 16px',
          textDecoration: 'none',
        }}
      >
        Generate
      </Link>
    </Flex>
  </Stack>
);

export default Home;
