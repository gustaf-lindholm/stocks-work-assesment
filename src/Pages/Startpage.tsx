import { Box, Flex, Heading } from '@chakra-ui/layout';
import * as React from 'react';
import Portfolio from '../Components/Portfolio';
import Search from '../Components/Search';
import { IStock } from '../Interfaces/StockInterfaces';

const StartPage: React.FC<{
  portfolio: IStock[] | [];
  onAddToPortfolio: (stock: IStock) => void;
  onRemoveFromPortfolio: (id: string) => void;
}> = ({onAddToPortfolio, onRemoveFromPortfolio, portfolio}) => {
  return (
    <Flex flexWrap="wrap">
      <Box border="1px solid gray" p="4" width={{ sm: '100%', md: '50%' }}>
        <Search onAddToPortfolio={onAddToPortfolio} />
      </Box>
      <Box border="1px solid gray" width={{ sm: '100%', md: '50%' }}>
        <Portfolio onRemoveFromPortfolio={onRemoveFromPortfolio} />
      </Box>
    </Flex>
  );
};

export default StartPage;
