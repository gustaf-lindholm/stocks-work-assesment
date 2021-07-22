import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/react';
import * as React from 'react';

const Header = () => {
  return <Flex borderBottom="1px solid gray" height="50px">
    <Heading>Stocks</Heading>
  </Flex>;
};

export default Header;