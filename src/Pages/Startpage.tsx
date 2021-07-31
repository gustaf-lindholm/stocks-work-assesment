import { Box, Flex } from "@chakra-ui/layout";
import { Status, Text, ToastOptions, useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import * as React from "react";
import Portfolio from "../Components/Portfolio";
import Search from "../Components/Search";
import useHttp from "../hooks/use-http";
import {
  IPortfolioStock,
  IRequestParams,
  IReturnData,
  IStock,
} from "../Interfaces/StockInterfaces";

type ToastStatus = "info" | "warning" | "success" | "error" | undefined;

const StartPage: React.FC = () => {
  // chackra toaster to show feedback
  const toast = useToast();
  const showToast = (message: string, status: ToastStatus): void => {
    toast({
      title: message,
      status: status,
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  // ref to handle when to fetch portfolio
  const doUpdate = React.useRef(false);

  // portfolio state
  const [portfolio, setPortfolio] = React.useState<IPortfolioStock[] | null>(null);

  // delete id to set loading state on specific delete button
  const [currentId, setCurrentId] = React.useState<string | null>(null);

  // Hooks for API-calls
  const [isFetchLoading, hasFetchError, fetchPortfolio, fetchResponse] =
    useHttp<IPortfolioStock[]>();
  const [isSaveLoading, hasSaveError, saveRequest, saveResponse] = useHttp<IPortfolioStock>();
  const [isDeleteLoading, hasDeleteError, deleteRequest, deleteResponse] = useHttp<IStock>();

  // Url to backend
  const url = "http://localhost:3001/portfolio";

  /**
   * Fetching portfolio
   */
  React.useEffect(() => {
    const dataHandler = (returnData: IReturnData<IPortfolioStock[]>): void => {
      console.log("1");
      // om den är tom när den kommer tillbaka, sätt till null
      if (returnData.data.length === 0) {
        console.log("2 fetchresponse", fetchResponse);
        setPortfolio(null);
      } else {
        setPortfolio(returnData.data);
      }
    };

    const requestParams: IRequestParams = {
      url,
    };

    // prevent duplicate toast
    const toastId = "fetch";
    // if error and not already showing a toast
    if (hasFetchError && !toast.isActive(toastId)) {
      showToast(
        `Error fetching portfolio.
        Response Code: ${fetchResponse?.status}
        Message: ${fetchResponse?.statusText}`,
        "error"
      );

      console.log(fetchResponse);
    }
    console.log(hasFetchError);

    if (!portfolio || doUpdate.current) {
      fetchPortfolio(requestParams, dataHandler);
    }

    doUpdate.current = false;
  }, [fetchPortfolio, isDeleteLoading, isSaveLoading, portfolio]);

  /**
   * Save to portfolio
   */
  const onAddToPortfolio = (item: IStock): void => {
    setCurrentId(item["1. symbol"]);
    const data: IPortfolioStock = {
      id: item["1. symbol"],
      data: { ...item },
    };

    const requestParams: IRequestParams = {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    // Datahandler for adding to portfolio
    const dataHandler = (response: IReturnData<IPortfolioStock>): void => {
      console.log("ADD TO PORTFOLIO: ", response.data);
      toast({
        title: `${response.data.data["2. name"]} added to portfolio.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      doUpdate.current = true;
    };

    // prevent duplicate toasts
    const toastId = "save";
    // if error and not already showing a toast
    if (hasSaveError && !toast.isActive(toastId)) {
      showToast(
        `Error adding ${item["2. name"]}.
        Response Code: ${deleteResponse?.status}
        Message: ${deleteResponse?.statusText}`,
        "error"
      );
    }

    saveRequest(requestParams, dataHandler);
  };

  /**
   * Delete from portfolio
   */
  const onDeleteHandler = (id: string): void => {
    const deleteHandler = (returnData: IReturnData<IStock>): void => {
      console.log("DELETE RETURNDATA", returnData);

      toast({
        title: `${id} deleted.`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      doUpdate.current = true;
    };

    // prevent duplicate toasts
    const toastId = "delete";
    // if error and not already showing a toast
    if (hasDeleteError && !toast.isActive(toastId)) {
      showToast(
        `Error deleting ${id}.
        Response Code: ${deleteResponse?.status}
        Message: ${deleteResponse?.statusText}`,
        "error"
      );
    }

    setCurrentId(id);

    const requestParams: IRequestParams = {
      url: `${url}/${id}`,
      method: "DELETE",
    };

    deleteRequest(requestParams, deleteHandler);
  };

  return (
    <Flex flexWrap="wrap">
      <Box border="1px solid gray" p="4" width={{ sm: "100%", md: "50%" }}>
        <Search
          onAddToPortfolio={onAddToPortfolio}
          portfolio={portfolio}
          currentId={currentId}
          isSaveLoading={isSaveLoading}
        />
      </Box>
      <Box border="1px solid gray" width={{ sm: "100%", md: "50%" }}>
        <Portfolio
          portfolio={portfolio}
          isLoading={isFetchLoading}
          isDeleteLoading={isDeleteLoading}
          currentId={currentId}
          onDeleteHandler={onDeleteHandler}
        />
      </Box>
    </Flex>
  );
};

export default StartPage;
