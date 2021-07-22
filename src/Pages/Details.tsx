import * as React from 'react';
import { Heading } from '@chakra-ui/layout';
import { Box, Button, SkeletonCircle, SkeletonText, Text } from '@chakra-ui/react';
import { useHistory, useParams } from 'react-router';
import { IStockDetails } from '../Interfaces/StockInterfaces';
import { currencyFormatter } from '../utils/CurrencyFormatter';

type Params = {
  stockSymbol: string;
};

const Details = () => {
  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  const { stockSymbol }: Params = useParams();
  const [stockDetails, setStockDetails] = React.useState<IStockDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const history = useHistory();

  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`;

  // demo url so not to use "api-key quota"
  // const url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";
  React.useEffect(() => {
    const getStockDetails = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const details: IStockDetails = await response.json();

          // Alpha Vantage API returns 200 OK even if a company is not found.
          // Check that we actually recieve an object.
          if (Object.keys(details).length !== 0) {
            // format market capitalizaion before saving to state
            details.MarketCapitalization = currencyFormatter(
              details.Currency,
              Number(details.MarketCapitalization)
            );

            setStockDetails(details);
          } else {
            setStockDetails(null);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getStockDetails();
  }, []);

  const goBackButton = (
    <Button
      onPointerDown={() => {
        history.goBack();
      }}
    >
      Go back
    </Button>
  );

  if (isLoading)
    return (
      <Box padding="6" boxShadow="lg" bg="white">
        <SkeletonCircle size="10" />
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </Box>
    );
  if (!stockDetails)
    return (
      <Box border="1px solid gray" p="4">
        {goBackButton}
        <Heading>Something went wrong...</Heading>
      </Box>
    );

  return (
    <Box border="1px solid gray" p="4">
      {goBackButton}
      <Heading mb="4" mt="4">
        {stockDetails.Name}
      </Heading>
      <Text>
        <b>Address</b> {stockDetails.Address}
      </Text>
      <Text>
        <b>Market Capitalization </b>
        {stockDetails.MarketCapitalization}
      </Text>
      <Text mt="4">{stockDetails.Description}</Text>
    </Box>
  );
};

export default Details;
