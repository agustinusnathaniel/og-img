'use client';

import { Box, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

import { useColorModeValue } from '@/lib/components/ui/color-mode';

const Page404 = () => {
  const buttonBg = useColorModeValue('gray.300', 'teal.500');

  return (
    <>
      <Image alt="Error 404 not found Illustration" src="/404 Error-pana.svg" />
      <Text fontSize="xs" textAlign="center">
        <a
          href="https://stories.freepik.com/web"
          rel="noopener noreferrer"
          target="_blank"
        >
          Illustration by Freepik Stories
        </a>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Page not Found.</Heading>

        <Box marginTop={4} textAlign="center">
          <Text>It&apos;s Okay!</Text>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: buttonBg,
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Let&apos;s Head Back
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
