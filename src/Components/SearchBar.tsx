import * as React from 'react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { InputGroup, InputLeftAddon, Spinner, Text } from '@chakra-ui/react';

const SearchBar: React.FC<{ setSearchParam: (string: string) => void, isLoading: boolean }> = ({ setSearchParam, isLoading }) => {

  return (
    <FormControl id="symbol" mb="2">
      <FormLabel>Stock search</FormLabel>
      <InputGroup>
      <InputLeftAddon>{isLoading ? <Spinner/> : <Text>🔍</Text>}</InputLeftAddon>
      <Input
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
        type="text"
        placeholder="Saab"
      />
      </InputGroup>
      <FormHelperText>Search for stocks with name or symbol</FormHelperText>
    </FormControl>
  );
};

export default SearchBar;
