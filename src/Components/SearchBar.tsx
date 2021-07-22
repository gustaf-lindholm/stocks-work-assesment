import * as React from 'react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { InputGroup, InputLeftAddon } from '@chakra-ui/react';

const SearchBar: React.FC<{ setSearchResult: (result: []) => void }> = ({ setSearchResult }) => {

  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  const [searchParam, setSearchParam] = React.useState('');

  React.useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchParam}&apikey=${apiKey}`;

    const search = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const searchResult = await response.json();

          setSearchResult(searchResult.bestMatches);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // only search if more than two letters
    searchParam.length > 2 && search();

    // listen for changes in the search input
  }, [searchParam]);

  return (
    <FormControl id="symbol" mb="2">
      <FormLabel>Stock search</FormLabel>
      <InputGroup>
      <InputLeftAddon children="🔍"/>
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
