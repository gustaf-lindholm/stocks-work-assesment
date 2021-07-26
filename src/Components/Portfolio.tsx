import * as React from 'react';
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
  Heading,
} from '@chakra-ui/react';
import { IStock } from '../Interfaces/StockInterfaces';
import { nanoid } from 'nanoid';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/use-fetch';

const Portfolio: React.FC<{
  onRemoveFromPortfolio: (id: string) => void;
}> = ({ onRemoveFromPortfolio }) => {

  // extract variables and sendRequest function from custom hook
  // sendRequest function takes arguments for at least url
  // and a function that takes care of the returned data
  const { isLoading, hasError, sendRequest } = useFetch();
  const [portfolio, setPortfolio] = React.useState<IStock[] | []>([]);

  const url = 'http://localhost:3001/portfolio';

  React.useEffect(() => {

    const transformData = (data: []) => {
      setPortfolio(data);
      console.log('DATA: ', data);
    };

    sendRequest({ url: url }, transformData);
  }, []);


  // transform data that we get back from the send request function
  // no external data is used inside, hence empty dependecy array

  
  if (isLoading) return <Heading>Loading...</Heading>;
  if(hasError) return <Heading>Error when fetching portfolio.</Heading>

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
        {portfolio.map((item) => {
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
                  _hover={{ backgroundColor: 'red' }}
                  onClick={() => onRemoveFromPortfolio(item['1. symbol'])}
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
