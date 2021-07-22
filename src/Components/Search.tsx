import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = () => {

  const [searchResult, setSearchResult] = React.useState<[] | undefined>()



  return (
    <Box>
      <SearchBar setSearchResult={setSearchResult}/>
      <SearchResults searchResult={searchResult!}/>
    </Box>
  );
};

export default Search;
