import * as React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { IStockDetails } from '../Interfaces/StockInterface';

type Params = {
  stockSymbol: string;
};

const Details = () => {
  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  const { stockSymbol }: Params = useParams();
  const [stockDetails, setStockDetails] = React.useState<IStockDetails | null>(null);

  function currencyFormatter(currency: string, MarketCapitalization: number) {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: currency,
      maximumSignificantDigits: 3
    }).format(MarketCapitalization);
  }

  React.useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`;

    const getStockDetails = async () => {
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

    getStockDetails();
  }, []);

  if (!stockDetails) return <Heading>Something went wrong...</Heading>;
  return (
    <Box>
      <Heading>{stockDetails.Name}</Heading>
      <Text>{stockDetails.Address}</Text>
      <Text>{currencyFormatter(stockDetails.Currency, Number(stockDetails.MarketCapitalization))}</Text>
      <Text>{stockDetails.Description}</Text>
    </Box>
  );
};

export default Details;
