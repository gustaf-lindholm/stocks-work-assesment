import * as React from 'react';
import { List, ListItem, ListIcon, Text, Spacer, Button } from '@chakra-ui/react';

interface Stock {
  "1. symbol": string;
  "2. name": string;
  "3.type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

const SearchResults: React.FC<{ searchResult: Stock[] }> = ({ searchResult }) => {
  React.useEffect(() => {}, []);
  
  if (!searchResult) return <Text>Search for stocks to see them here</Text>;
  return (
    <List spacing={3} p="4">
      {searchResult.map((item, index) => {
        return (
          <ListItem shadow="md" border="0.25px solid gray" p="2" display="flex" flexDirection="row" alignItems="center" key={searchResult[index]['1. symbol']}>
            <Text isTruncated maxW="80%">
              {`${searchResult[index]['2. name']} - ${searchResult[index]['2. name']}`}
            </Text>
            <Spacer/>
            <Button>&#9734;</Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResults;
