import * as React from 'react';
import { FormControl, FormLabel, FormHelperText } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { InputGroup, InputLeftAddon, Text, Spinner } from '@chakra-ui/react';

const SearchBar: React.FC<{
  setSearchResult: (searchResult: []) => void;
  setSearchIsLoading: (arg: boolean) => void;
  searchIsLoading: boolean
}> = ({ setSearchResult, setSearchIsLoading, searchIsLoading }) => {

  // const apiKey = process.env.REACT_APP_ALPHA_API_KEY;
  const [searchParam, setSearchParam] = React.useState('');

  const apiKey = process.env.REACT_APP_ALPHA_API_KEY;

  React.useEffect(() => {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchParam}&apikey=${apiKey}`;
    // const url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo';

    const search = async () => {
      setSearchIsLoading(true);
      try {
        const response = await fetch(url);

        if (response.ok) {
          const searchResult = await response.json();

          setSearchResult(searchResult.bestMatches);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setSearchIsLoading(false);
      }
    };

    // only search if more than three letters
    searchParam.length > 3 && search();

    // listen for changes in the search input
  }, [apiKey, searchParam, setSearchIsLoading, setSearchResult]);

  return (
    <FormControl id="symbol" mb="2">
      <FormLabel>Stock search</FormLabel>
      <InputGroup>
        <InputLeftAddon>
        {searchIsLoading ? <Spinner /> : <Text>🔍</Text>}
        </InputLeftAddon>
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
