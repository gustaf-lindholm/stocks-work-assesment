import { Box, Flex, Heading } from '@chakra-ui/layout';
import * as React from 'react';
import Portfolio from '../Components/Portfolio';
import Search from '../Components/Search';
import { IStock } from '../Interfaces/StockInterface';

const StartPage: React.FC = () => {

  const [portFolio, setPortfolio] = React.useState<IStock[]>([]);

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
    <Flex flexWrap="wrap">
    <Box border="1px solid gray" p="4" width={{ sm: '100%', md: '50%' }}>
      <Search onAddToPortfolio={onAddToPortfolio} />
    </Box>
    <Box border="1px solid gray" width={{ sm: '100%', md: '50%' }}>
      <Portfolio portfolio={portFolio} onRemoveFromPortfolio={onRemoveFromPortfolio} />
    </Box>
  </Flex>
  )
}

export default StartPage;