import * as React from "react";
import { Heading } from "@chakra-ui/layout";
import { Box, Button, SkeletonCircle, SkeletonText, Text } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router";
import { IStockDetails, IReturnData, IRequestParams } from "../Interfaces/StockInterfaces";
import { currencyFormatter } from "../utils/CurrencyFormatter";
import useHttp from "../hooks/use-http";

type Params = {
  stockSymbol: string;
};

const Details: React.FC = () => {
  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  const { stockSymbol }: Params = useParams();
  const [stockDetails, setStockDetails] = React.useState<IStockDetails | null>(null);
  const [isLoading, hasError, sendRequest, responseObj] = useHttp<IStockDetails>();
  const [hasNoData, setHasNoData] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const history = useHistory();

  const url = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${stockSymbol}&apikey=${apiKey}`;
  // const url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";

  React.useEffect(() => {
    const dataHandler = (returnData: IReturnData<IStockDetails>): void => {
      // Alpha Vantage API returns 200 OK even if a company is not found.
      // Check that we actually recieve an object.
      if (Object.keys(returnData.data).length !== 0 && !returnData.data["Error Message"]) {
        // format market capitalizaion before saving to state
        returnData.data.MarketCapitalization = currencyFormatter(
          returnData.data.Currency,
          Number(returnData.data.MarketCapitalization)
        );

        setStockDetails(returnData.data);
        setHasNoData(false);

        // api returns 200 ok but empty object when no info in db
      } else if (Object.keys(returnData.data).length === 0 && returnData.statusCode === 200) {
        setHasNoData(true);

        // Handle if we get error message in response.
      } else if (returnData.data["Error Message"]) {
        setErrorMessage(returnData.data["Error Message"]);
      }
    };

    const requestParams: IRequestParams = {
      url,
    };

    sendRequest(requestParams, dataHandler);
  }, [sendRequest, url]);

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
  if (hasNoData)
    return (
      <Box border="1px solid gray" p="4">
        {goBackButton}
        <Heading>No details for stock with symbol &quot;{stockSymbol}&quot;</Heading>
      </Box>
    );
  if (errorMessage)
    return (
      <Box border="1px solid gray" p="4">
        {goBackButton}
        <Heading>Error fetching details</Heading>
        <Text>{errorMessage}</Text>
      </Box>
    );

  return (
    <Box border="1px solid gray" p="4">
      {goBackButton}
      <Heading mb="4" mt="4">
        {stockDetails?.Name}
      </Heading>
      <Text>
        <b>Address</b> {stockDetails?.Address}
      </Text>
      <Text>
        <b>Market Capitalization </b>
        {stockDetails?.MarketCapitalization}
      </Text>
      <Text mt="4">{stockDetails?.Description}</Text>
    </Box>
  );
};

export default Details;
