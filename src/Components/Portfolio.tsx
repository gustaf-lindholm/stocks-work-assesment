import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Button,
  Tooltip,
  Skeleton,
  Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { IStock } from '../Interfaces/StockInterfaces';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';

const Portfolio: React.FC<{ portfolio: IStock[]; fetchPortfolio: () => void; isLoading: boolean }> =
  ({ portfolio, fetchPortfolio, isLoading }) => {
    const [currentId, setCurrentId] = React.useState(""); // used show spinner in delete button

    const onRemoveHandler = async (id: string) => {
      const url = `http://localhost:3001/portfolio/${id}`;
      setCurrentId(id)

      try {
        const response = await fetch(url, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchPortfolio();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCurrentId("");
      }
    };

    if (isLoading)
      return (
        <Stack>
          <Skeleton height="40px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      );

    return (
      <Table variant="striped" colorScheme="gray">
        {portfolio.length === 0 && (
          <TableCaption>Search for stocks and add them to the portfolio</TableCaption>
        )}
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>Symbol</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {portfolio.map((item, i) => {
            return (
              <Tr key={nanoid()}>
                <Td fontSize={['sm', 'md']}>
                  <NavLink to={`/details/${item['1. symbol']}`}>
                    <Tooltip label="Click here for details!">{`⭐ ${item['2. name']}`}</Tooltip>
                  </NavLink>
                </Td>
                <Td fontSize={['sm', 'md']}>{item['1. symbol']}</Td>
                <Td>
                  <Button
                    id={item.id}
                    _hover={{ backgroundColor: 'red' }}
                    onPointerDown={() => onRemoveHandler(item.id)}
                    loadingText=""
                    // om deletLoading och currId === denna id
                    isLoading={currentId === item.id}
                  >
                    🗑️
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    );
  };

export default Portfolio;
