import * as React from "react";
import { List, ListItem, Text, Spacer, Button, Skeleton, Stack, Tooltip } from "@chakra-ui/react";
import { IStock } from "../Interfaces/StockInterfaces";

const SearchResults: React.FC<{
  searchResult: IStock[] | null;
  onAddToPortfolio: (stock: IStock) => void;
  isLoading: boolean;
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
    <List fontSize={["sm", "md"]} spacing={3} p="4" border="1px solid gray">
      {searchResult.map((item) => {
        return (
          <ListItem
            shadow="md"
            border="0.25px solid gray"
            p="2"
            display="flex"
            flexDirection="row"
            alignItems="center"
            key={item["1. symbol"]}
          >
            <Text isTruncated maxW="80%">
              {`${item["2. name"]} - ${item["1. symbol"]}`}
            </Text>
            <Spacer />
            {item.isAdded ? (
              <>
                <Tooltip label="Already in portfolio">
                  <Text mr="4">⭐</Text>
                </Tooltip>
              </>
            ) : (
              <Button onClick={() => onAddToPortfolio(item)}>➕</Button>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};

export default SearchResults;
