import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { IStock } from '../Interfaces/StockInterfaces';

const Search: React.FC<{ onAddToPortfolio: (stock: IStock) => void }> = ({ onAddToPortfolio }) => {
  const [searchResult, setSearchResult] = React.useState<[] | undefined>();
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <SearchBar
        setSearchResult={setSearchResult}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <SearchResults
        searchResult={searchResult!}
        onAddToPortfolio={onAddToPortfolio}
        isLoading={isLoading}
      />
    </>
  );
};

export default Search;
