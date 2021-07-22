import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import * as React from 'react';


const SearchBar: React.FC<{setSearchResult: (result: []) => void}> = ({ setSearchResult }) => {
  const [searchParam, setSearchParam] = React.useState('');

  React.useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchParam}&apikey=HTJRJGUCDN10NMV9`;

    const search = async () => {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const searchResult = await response.json();
          console.log(searchResult);
          setSearchResult(searchResult.bestMatches)
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
    <FormControl id="symbol">
      <FormLabel>Stock search</FormLabel>
      <Input
        onChange={(e) => {
          setSearchParam(e.target.value);
        }}
        type="text"
      />
      <FormHelperText>Search for stocks with name or symbol</FormHelperText>
    </FormControl>
  );
};

export default SearchBar;
