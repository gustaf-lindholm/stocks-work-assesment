import { Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr, Button, LinkBox, LinkOverlay } from '@chakra-ui/react';
import * as React from 'react';
import { IStock } from '../Interfaces/StockInterface';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';

const Portfolio: React.FC<{ portfolio: IStock[] | [], onRemoveFromPortfolio: (id: string) => void }> = ({ portfolio, onRemoveFromPortfolio }) => {
  return (
      <Table variant="striped" colorScheme="gray">
        {portfolio.length === 0 && <TableCaption>Search for stocks and add them to the portfolio</TableCaption>}
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>Symbol</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {portfolio.map((item) => {
            return (
              <LinkBox as="tr" key={nanoid()}>
                <Td fontSize={["sm", "md"]}>{`⭐ ${item['2. name']}`}</Td>
                <Td fontSize={["sm", "md"]}><LinkOverlay as={NavLink} to={`/details/${item['1. symbol']}`}>{item['1. symbol']}</LinkOverlay></Td>
                <Td>
                  <Button _hover={{backgroundColor: "red"}} onClick={() => onRemoveFromPortfolio(item['1. symbol'])}>🗑️</Button>
                </Td>
              </LinkBox>
            );
          })}
        </Tbody>
      </Table>
  );
};

export default Portfolio;
