import * as React from "react";
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
  Stack,
  Skeleton,
} from "@chakra-ui/react";
import { IPortfolioStock } from "../Interfaces/StockInterfaces";
import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";

const Portfolio: React.FC<{
  portfolio: IPortfolioStock[] | null;
  isLoading: boolean;
  isDeleteLoading: boolean;
  onDeleteHandler: (id: string) => void;
  deleteId: string | null;
}> = ({ portfolio, isLoading, isDeleteLoading, deleteId, onDeleteHandler }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      {!portfolio && <TableCaption>Search for stocks and add them to the portfolio</TableCaption>}
      <Thead>
        <Tr>
          <Th>Company Name</Th>
          <Th>Symbol</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {portfolio?.map((item) => {
          return (
            <Tr key={nanoid()}>
              <Td fontSize={["sm", "md"]}>
                <NavLink to={`/details/${item.data["1. symbol"]}`}>
                  <Tooltip label="Click here for details!">{`⭐ ${item.data["2. name"]}`}</Tooltip>
                </NavLink>
              </Td>
              <Td fontSize={["sm", "md"]}>{item.data["1. symbol"]}</Td>
              <Td>
                <Button
                  _hover={{ backgroundColor: "red" }}
                  onClick={() => onDeleteHandler(item.id)}
                  isLoading={isDeleteLoading && deleteId === item.id}
                >
                  🗑️
                </Button>
              </Td>
            </Tr>
          );
        })}
        {isLoading && !isDeleteLoading && (
          <Tr>
            <Td>
              <Stack>
                <Skeleton height="20px" />
              </Stack>
            </Td>
            <Td>
              <Stack>
                <Skeleton height="20px" />
              </Stack>
            </Td>
            <Td>
              <Stack>
                <Skeleton height="20px" />
              </Stack>
            </Td>
          </Tr>
        )}
      </Tbody>
    </Table>
  );
};

export default Portfolio;
