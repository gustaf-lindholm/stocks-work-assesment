import { Flex } from '@chakra-ui/layout';
import { Button, Heading, Link, Spacer, Text } from '@chakra-ui/react';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <Flex
      minH="80px"
      mb="6"
      borderBottom="1px solid gray"
      shadow="md"
      height="50px"
      alignItems="center"
    >
      <Heading flex="1" as={NavLink} to="/">
        Stocks
      </Heading>
    </Flex>
  );
};

export default Header;
