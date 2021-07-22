import { Heading } from '@chakra-ui/layout';
import { Box, Text } from '@chakra-ui/react';
import * as React from 'react';
import { useParams } from 'react-router';
import { IStockDetails } from '../Interfaces/StockInterface';

type Params = {
  stockSymbol: string;
};

const Details = () => {
  const { stockSymbol }: Params = useParams();
  const [stockDetails, setStockDetails] = React.useState<IStockDetails | null>(null);

  React.useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=HTJRJGUCDN10NMV9`;

    const stockDetails = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const details = await response.json();
          setStockDetails(details);
        }
      } catch (error) {
        console.log(error);
      }
    };

    stockDetails();
  }, []);

  if (!stockDetails) return <Heading>Something went wrong...</Heading>
  return (
    <Box>
      <Heading>{stockDetails.Name}</Heading>
      <Text>{stockDetails.Address}</Text>
      <Text>{stockDetails.MarketCapitalization}</Text>
      <Text>{stockDetails.Description}</Text>
    </Box>
  );
};

export default Details;
