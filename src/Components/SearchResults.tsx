import * as React from 'react';
import { List, ListItem, ListIcon, Text, Spacer, Button } from '@chakra-ui/react';
import { IStock } from '../Interfaces/StockInterface';

const SearchResults: React.FC<{
  searchResult: IStock[];
  onAddToPortfolio: (stock: IStock) => void;
}> = ({ searchResult, onAddToPortfolio }) => {
  React.useEffect(() => {}, []);

  if (!searchResult) return <Text>Search for stocks to see them here</Text>;
  return (
    <List spacing={3} p="4">
      {searchResult.map((item, index) => {
        return (
          <ListItem
            shadow="md"
            border="0.25px solid gray"
            p="2"
            display="flex"
            flexDirection="row"
            alignItems="center"
            key={searchResult[index]['1. symbol']}
          >
            <Text isTruncated maxW="80%">
              {`${searchResult[index]['2. name']} - ${searchResult[index]['2. name']}`}
            </Text>
            <Spacer />
            <Button onClick={() => onAddToPortfolio(searchResult[index])}>&#9734;</Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResults;
