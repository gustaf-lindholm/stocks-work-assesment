import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import * as React from 'react';

const SearchBar = () => {
  return (
    <FormControl id="symbol">
      <FormLabel>Stock search</FormLabel>
      <Input type="text" />
      <FormHelperText>Search for stocks with name or symbol</FormHelperText>
    </FormControl>
  );
};

export default SearchBar;
