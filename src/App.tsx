import * as React from 'react';
import { ChakraProvider, theme, Container } from '@chakra-ui/react';
import { Route } from 'react-router-dom';
import Header from './Components/Header';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import StartPage from './Pages/Startpage';
import Details from './Pages/Details';
import { IStock } from './Interfaces/StockInterfaces';

const App = () => {
  const [portfolio, setPortfolio] = React.useState<IStock[]>([]);

  const onAddToPortfolio = (stock: IStock) => {
    setPortfolio((currentPortfolio) => {
      return currentPortfolio?.concat(stock);
    });
  };

  const onRemoveFromPortfolio = (id: string) => {
    setPortfolio((currentPortfolio) => {
      return currentPortfolio.filter((stock, index) => {
        return id !== currentPortfolio[index]['1. symbol'];
      });
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <Header />
        <Route exact path="/">
          <StartPage
            portfolio={portfolio}
            onAddToPortfolio={onAddToPortfolio}
            onRemoveFromPortfolio={onRemoveFromPortfolio}
          />
        </Route>
        <Route path="/details/:stockSymbol">
          <Details />
        </Route>
      </Container>
    </ChakraProvider>
  );
};

export default App;
