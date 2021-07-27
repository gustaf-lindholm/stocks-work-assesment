import * as React from 'react';
import { List, ListItem, Text, Spacer, Button, Skeleton, Stack } from '@chakra-ui/react';
import { IStock } from '../Interfaces/StockInterfaces';
import { nanoid } from 'nanoid';

const SearchResults: React.FC<{
  searchResult: IStock[];
  setPortfolioHandler: (stock: IStock) => void;
  portfolio: IStock[];
  isLoading: boolean;
  searchIsLoading: boolean
  startLoading: () => void;
  stopLoading: () => void;
}> = ({ searchResult, setPortfolioHandler, portfolio, searchIsLoading, startLoading, stopLoading }) => {

  // used to show spinner in specific delete button
  const [currentId, setCurrentId] = React.useState<string | boolean>("");

  const isInPortfolio = (stock : IStock) => {
    const filtered = portfolio.filter((item, index) => {
      return stock['1. symbol'] === portfolio[index]['1. symbol'];
    });
    
    return filtered.length === 0 ? false : true;
  };

  const addToPortfolioHandler = async (stock: IStock) => {
    // Check if stock is already in portfolio

    const isDuplicate = isInPortfolio(stock)

    
    // If stock not in portfolio, add it.
    if (!isDuplicate) {
      setCurrentId(stock['1. symbol']);
      startLoading();

      const url = 'http://localhost:3001/portfolio';

      // JSON-Server requires a unique ID
      stock.id = nanoid();

      // spara till api
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(stock),
        });

        // if ok and resource created, set state
        if (response.ok && response.status === 201) setPortfolioHandler(stock);
      } catch (error) {
        console.log(error);
      } finally {
        stopLoading();
        setCurrentId(false)
      }
    }

  };

  // @todo response if you already has added stock
  if (!searchResult) return <Text>Search for stocks to see them here</Text>;
  if (searchIsLoading) {
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
      {searchResult.map((item) => {
        return (
          <ListItem
            shadow="md"
            border="0.25px solid gray"
            p="2"
            display="flex"
            flexDirection="row"
            alignItems="center"
            key={item['1. symbol']}
          >
            <Text fontSize={['sm', 'md']} isTruncated maxW="80%">
              {`${item['2. name']} - ${item['1. symbol']}`}
            </Text>
            <Spacer />
            <Button
              id={item['1. symbol']}
              onClick={() => addToPortfolioHandler(item)}
              loadingText=""
              isLoading={currentId === item['1. symbol']}
            >
              ➕
            </Button>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResults;
