import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { IStock } from '../Interfaces/StockInterfaces';

const Search: React.FC<{
  setPortfolioHandler: (stock: IStock) => void;
  portfolio: IStock[];
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}> = ({ setPortfolioHandler, portfolio, isLoading, startLoading, stopLoading }) => {

  const [searchResult, setSearchResult] = React.useState<[] | undefined>();
  // loading state for searching
  const [searchIsLoading, setSearchIsLoading] = React.useState(false)

  return (
    <>
      <SearchBar setSearchIsLoading={setSearchIsLoading} setSearchResult={setSearchResult} />
      <SearchResults
        searchResult={searchResult!}
        portfolio={portfolio}
        setPortfolioHandler={setPortfolioHandler}
        isLoading={isLoading}
        startLoading={startLoading}
        stopLoading={stopLoading}
        searchIsLoading={searchIsLoading}
      />
    </>
  );
};

export default Search;
