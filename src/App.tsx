import * as React from 'react';
import { ChakraProvider, theme, Container } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import StartPage from './Pages/Startpage';
import Details from './Pages/Details';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <Header />
        <Route exact path="/">
          <StartPage />
        </Route>
        <Route path="/details/:stockSymbol">
          <Details />
        </Route>
      </Container>
    </ChakraProvider>
  );
};

export default App;
