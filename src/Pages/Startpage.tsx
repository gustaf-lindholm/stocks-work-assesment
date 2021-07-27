import { Box, Flex, Heading } from '@chakra-ui/layout';
import * as React from 'react';
import Portfolio from '../Components/Portfolio';
import Search from '../Components/Search';
import { useLoading } from '../hooks/use-loading';
import { IStock } from '../Interfaces/StockInterfaces';

const StartPage: React.FC = () => {
  const [portfolio, setPortfolio] = React.useState<IStock[]>([]);
  const [isLoading, startLoading, stopLoading] = useLoading();

  // set new stock to portfolio state
  const setPortfolioHandler = (stock: IStock) => {
    setPortfolio((currentPortfolio) => {
      return currentPortfolio.concat(stock);
    });
  };

  const fetchPortfolio = async () => {
    const url = 'http://localhost:3001/portfolio';

    try {
      startLoading();
      const response = await fetch(url);

      if (response.ok) {
        const portfolio = await response.json();

        setPortfolio(portfolio);
      }
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };
  
  React.useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex flexWrap="wrap">
      <Box border="1px solid gray" p="4" width={{ sm: '100%', md: '50%' }}>
        <Search
          portfolio={portfolio}
          setPortfolioHandler={setPortfolioHandler}
          isLoading={isLoading}
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </Box>
      <Box border="1px solid gray" width={{ sm: '100%', md: '50%' }}>
        <Portfolio portfolio={portfolio} fetchPortfolio={fetchPortfolio} isLoading={isLoading} />
      </Box>
    </Flex>
  );
};

export default StartPage;
