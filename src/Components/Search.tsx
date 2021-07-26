/* eslint-disable @typescript-eslint/no-shadow */
import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { IStock, ISymbolSearchResult } from '../Interfaces/StockInterfaces';
import useFetch from '../hooks/use-fetch';

const Search: React.FC<{ onAddToPortfolio: (stock: IStock) => void }> = ({ onAddToPortfolio }) => {
  const [searchParam, setSearchParam] = React.useState('');
  const [searchResult, setSearchResult] = React.useState<IStock[] | undefined>();

  // får tillbaks en funktion som tar två parametrar (requestParams, dataHandler(data))
  // dataHandler tar data av generic type
  const { isLoading, hasError, sendRequest } = useFetch();

  const apiKey = undefined;

  const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchParam}&apikey=${apiKey}`;

  React.useEffect(() => {
    function dataHandler <T extends ISymbolSearchResult>(searchResult: T): void {
      setSearchResult(searchResult.bestMatches);
      console.log('SEARCH: ', searchParam);
    }
    /**
     * Argument of type '<T extends ISymbolSearchResult>(searchResult: T) => void' is not assignable to parameter of type 'DataHandler'.
  Types of parameters 'searchResult' and 'data' are incompatible.
    Type 'T' is not assignable to type 'ISymbolSearchResult'.ts(2345)
     */

    searchParam.length > 2 && sendRequest({ url: url }, dataHandler);
  }, [searchParam]);

  return (
    <>
      <SearchBar setSearchParam={setSearchParam} isLoading={isLoading} />
      <SearchResults
        searchResult={searchResult!}
        onAddToPortfolio={onAddToPortfolio}
        isLoading={isLoading}
      />
    </>
  );
};

export default Search;
