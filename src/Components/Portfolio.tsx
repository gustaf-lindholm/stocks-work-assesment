import { Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import * as React from 'react';
import { IStock } from '../Interfaces/StockInterface';
import { nanoid } from 'nanoid';

const Portfolio: React.FC<{ portfolio: IStock[] | [], onRemoveFromPortfolio: (id: string) => void }> = ({ portfolio, onRemoveFromPortfolio }) => {
  return (
    <Box>
      <Table variant="striped" colorScheme="gray">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
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
              <Tr key={nanoid()}>
                <Td>{item['2. name']}</Td>
                <Td>{item['1. symbol']}</Td>
                <Td>
                  <Button backgroundColor="red.100" onClick={() => onRemoveFromPortfolio(item['1. symbol'])}>Remove</Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Portfolio;
