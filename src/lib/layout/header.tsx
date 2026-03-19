import { Box, Flex, Heading } from '@chakra-ui/react';
import Link from 'next/link';

import ThemeToggle from './theme-toggle';

const Header = () => {
  return (
    <Flex align="center" as="header" width="full">
      <Heading as="h1" size="md">
        <Link href="/">og-img</Link>
      </Heading>

      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
