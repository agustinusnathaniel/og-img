import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex align="center" as="footer" width="full">
      <Text>
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://agustinusnathaniel.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          agustinusnathaniel.com
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
