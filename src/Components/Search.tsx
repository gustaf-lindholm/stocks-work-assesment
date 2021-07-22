import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import * as React from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

const Search = () => {
  return (
    <Box>
      <SearchBar />
      <SearchResults />
    </Box>
  );
};

export default Search;
