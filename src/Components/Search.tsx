/* eslint-disable @typescript-eslint/no-shadow */
import * as React from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import {
  IPortfolioStock,
  IReturnData,
  IStock,
  ISymbolSearchResult,
} from "../Interfaces/StockInterfaces";
import useHttp from "../hooks/use-http";
import { Heading, Text } from "@chakra-ui/react";

const Search: React.FC<{
  portfolio: IPortfolioStock[] | null;
  onAddToPortfolio: (stock: IStock) => void;
  currentId: string | null;
  isSaveLoading: boolean;
}> = ({ portfolio, onAddToPortfolio, currentId, isSaveLoading }) => {
  const [searchParam, setSearchParam] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<IStock[] | null>(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  // const url = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo";
  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchParam}&apikey=${apiKey}`;

  const [isLoadingSearch, searchHasError, sendSearchRequest] = useHttp<ISymbolSearchResult>();

  // Effect for searching
  React.useEffect(() => {
    // Datahandler when searching
    const searchDataHandler = (response: IReturnData<ISymbolSearchResult>): void => {
      const recievedData: ISymbolSearchResult = response.data;

      if (response.data["Error Message"]) {
        setErrorMessage(response.data["Error Message"]);
      }

      if (response.data.bestMatches) {
        // add isAdded property on searchresult if already in portfolio
        recievedData.bestMatches?.map((item) => {
          // @todo After adding, check the spicific added stock and place star on that
          portfolio?.map((portItem) => {
            if (portItem.id === item["1. symbol"]) {
              item.isAdded = true;
            }
          });
        });
        setSearchResult(response.data.bestMatches);
      }
    };
    const requestParams = {
      url: url,
    };
    searchParam.length > 3 && sendSearchRequest(requestParams, searchDataHandler);
  }, [searchParam, sendSearchRequest, url, portfolio]);

  return (
    <>
      <SearchBar setSearchParam={setSearchParam} isLoading={isLoadingSearch} />
      {searchHasError || errorMessage ? (
        <>
          <Heading>Error</Heading>
          <Text>{errorMessage}</Text>
        </>
      ) : (
        <SearchResults
          searchResult={searchResult}
          onAddToPortfolio={onAddToPortfolio}
          isLoadingSearch={isLoadingSearch}
          isSaveLoading={isSaveLoading}
          currentId={currentId}
        />
      )}
    </>
  );
};

export default Search;
