import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { IStock } from '../Interfaces/StockInterfaces';

const Search: React.FC<{ onAddToPortfolio: (stock: IStock) => void }> = ({ onAddToPortfolio }) => {
  const [searchResult, setSearchResult] = React.useState<[] | undefined>();

  return (
    <>
      <SearchBar setSearchResult={setSearchResult} />
      <SearchResults searchResult={searchResult!} onAddToPortfolio={onAddToPortfolio} />
    </>
  );
};

export default Search;
