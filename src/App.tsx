import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Container,
  Flex,
} from '@chakra-ui/react';
import Header from './Components/Header';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Search from './Components/Search';
import Portfolio from './Components/Portfolio';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Container maxW="container.lg">
      <Header />
      <Flex flexWrap="wrap">
        <Box border="1px solid gray" width={{sm: "100%", md: "50%"}}>
          <Search />
        </Box>
        <Box border="1px solid gray" width={{sm: "100%", md: "50%"}}>
          <Portfolio />
        </Box>
      </Flex>
    </Container>
  </ChakraProvider>
);