import * as React from 'react';
import { List, ListItem, Text, Spacer, Button } from '@chakra-ui/react';
import { IStock } from '../Interfaces/StockInterface';

const SearchResults: React.FC<{
  searchResult: IStock[];
  onAddToPortfolio: (stock: IStock) => void;
}> = ({ searchResult, onAddToPortfolio }) => {
  React.useEffect(() => {}, []);

  if (!searchResult) return <Text>Search for stocks to see them here</Text>;
  return (
    <List spacing={3} p="4" border="1px solid gray">
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
            <Text fontSize={["sm", "md"]} isTruncated maxW="80%">
              {`${searchResult[index]['2. name']} - ${searchResult[index]['2. name']}`}
            </Text>
            <Spacer />
            <Button onClick={() => onAddToPortfolio(searchResult[index])}>➕</Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResults;
