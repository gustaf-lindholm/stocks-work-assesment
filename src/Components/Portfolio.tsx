import { Box, Table, TableCaption, Tbody, Td, Th, Thead, Tr, Button } from '@chakra-ui/react';
import * as React from 'react';

const Portfolio = () => {
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
          <Tr>
            <Td>Apple</Td>
            <Td>AAPL</Td>
            <Td><Button>Remove</Button></Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default Portfolio;
