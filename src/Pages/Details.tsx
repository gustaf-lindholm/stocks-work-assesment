import * as React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box, Text } from '@chakra-ui/react';
import { useParams } from 'react-router';
import { IStockDetails } from '../Interfaces/StockInterfaces';
import { currencyFormatter } from '../utils/CurrencyFormatter';

type Params = {
  stockSymbol: string;
};

const Details = () => {
  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  const { stockSymbol }: Params = useParams();
  const [stockDetails, setStockDetails] = React.useState<IStockDetails | null>(null);


  React.useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`;

    const getStockDetails = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const details: IStockDetails = await response.json();

          // Alpha Vantage API returns 200 OK even if a company is not found.
          // Check that we actually recieve an object.
          if (Object.keys(details).length !== 0) {
            
            // format market capitalizaion before saving to state
            details.MarketCapitalization = currencyFormatter(details.Currency, Number(details.MarketCapitalization))

            setStockDetails(details);
          } else {
            setStockDetails(null)
          }
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
      <Text>{stockDetails.MarketCapitalization}</Text>
      <Text>{stockDetails.Description}</Text>
    </Box>
  );
};

export default Details;
