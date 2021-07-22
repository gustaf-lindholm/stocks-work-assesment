import * as React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  Container,
  Flex,
} from '@chakra-ui/react';
import Header from './Components/Header';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Search from './Components/Search';
import Portfolio from './Components/Portfolio';
import { IStock } from './Interfaces/StockInterface';

const App = () => {

  const [portFolio, setPortfolio] = React.useState<IStock[]>([])

  const onAddToPortfolio = (stock: IStock) => {
    setPortfolio((currentTodos) => {
      return currentTodos?.concat(stock);
    })
  };

  return (
    <ChakraProvider theme={theme}>
      <Container maxW="container.lg">
        <Header />
        <Flex flexWrap="wrap">
          <Box border="1px solid gray" width={{ sm: '100%', md: '50%' }}>
            <Search onAddToPortfolio={onAddToPortfolio}/>
          </Box>
          <Box border="1px solid gray" width={{ sm: '100%', md: '50%' }}>
            <Portfolio portfolio={portFolio}/>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default App;