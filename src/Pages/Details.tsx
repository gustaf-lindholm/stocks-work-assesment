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
  const [stockDetails, setStockDetails] = React.useState<IStockDetails>({} as IStockDetails);
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
          console.log(details);

          // Alpha Vantage API returns 200 OK even if a company is not found.
          // Check that we actually recieve an object.
          if (!Object.keys(details).includes('Note') && Object.keys(details).length > 0) {
            // format market capitalizaion before saving to state
            console.log('FIRST IF');
            details.MarketCapitalization = currencyFormatter(
              details.Currency,
              Number(details.MarketCapitalization)
            );

            setStockDetails(details);
          } else if (details.Note) {
            setStockDetails(details);
          } else {
            setStockDetails({} as IStockDetails);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getStockDetails();
  }, [url]);

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
  if (Object.keys(stockDetails).length === 0)
    return (
      <Box border="1px solid gray" p="4">
        {goBackButton}
        <Heading>No details about this stock.</Heading>
      </Box>
    );

  return (
    <>
      {stockDetails.Note ? (
        <Box border="1px solid gray" p="4">
          {goBackButton}
          <Heading>API LImit Reached</Heading>
          <Text>{stockDetails.Note}</Text>
        </Box>
      ) : (
        <Box border="1px solid gray" p="4">
          {goBackButton}
          <Heading mb="4" mt="4">
            {stockDetails.Name ? stockDetails.Name : 'API Limit reached'}
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
      )}
    </>
  );
};

export default Details;
