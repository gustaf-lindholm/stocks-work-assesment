/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { IStock, ISymbolSearchResult } from '../Interfaces/StockInterfaces';
import useHttp from "../hooks/use-http";
import { Heading, Text } from "@chakra-ui/react";

const Search: React.FC<{ onAddToPortfolio: (stock: IStock) => void }> = ({ onAddToPortfolio }) => {
  const [searchParam, setSearchParam] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<IStock[] | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const apiKey = undefined;

  const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo";
  // const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchParam}&apikey=${apiKey}`;

  const [isLoading, hasError, sendRequest] = useHttp<ISymbolSearchResult>();


  function dataHandler(data: ISymbolSearchResult): void {
    const recievedData: ISymbolSearchResult = data; 
    
    if(data["Error Message"]) {
      setErrorMessage(data["Error Message"])
    }

    if(data.bestMatches) {
      setSearchResult(data.bestMatches)
    }
    console.log("Recieved:", recievedData);
  }

  React.useEffect(() => {
    const requestParams = {
      url: url
    }

    searchParam.length > 3 && sendRequest(requestParams, dataHandler);
  }, [searchParam, sendRequest, url])


  return (
    <>
      <SearchBar setSearchParam={setSearchParam} isLoading={isLoading} />
      {hasError || errorMessage 
      ? 
        <>
          <Heading>Error</Heading>
          <Text>{errorMessage}</Text>
        </>
      :
        <SearchResults
        searchResult={searchResult}
        onAddToPortfolio={onAddToPortfolio}
        isLoading={isLoading}
        />
    }
    </>
  );
};

export default Search;
