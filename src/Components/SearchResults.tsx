import * as React from 'react';
import { List, ListItem, Text, Spacer, Button, Skeleton, Stack } from '@chakra-ui/react';
import { IStock } from '../Interfaces/StockInterfaces';

const SearchResults: React.FC<{
  searchResult: IStock[] | null;
  onAddToPortfolio: (stock: IStock) => void;
  isLoading: boolean
}> = ({ searchResult, onAddToPortfolio, isLoading }) => {
  if (!searchResult) return <Text>Search for stocks to see them here ⬆️</Text>;
  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="20px" />
        <Skeleton height="20px" />
        <Skeleton height="20px" />
      </Stack>
    );
  }
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
            <Text fontSize={['sm', 'md']} isTruncated maxW="80%">
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
