import * as React from "react";
import { IRequestParams, IReturnData } from "../Interfaces/StockInterfaces";

/**
 * Hook that makes API-calls.
 * Pass the type of the expected response to the hook
 * @returns isLoading, hasError and sendRequest function to make API-calls
 * @callback sendRequest takes two parameters:
 * requestParams
 * dataHandler
 * @type The type you expect to get back
 */
const useHttp = <T>(): [
  boolean, // declare tuple with return types
  boolean,
  (requestParams: IRequestParams, dataHandler: (data: IReturnData<T>) => void) => void,
  Response | null
] => {
  // set states
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [responseObject, setResponseObject] = React.useState<Response | null>(null);

  const defaultParams: IRequestParams = React.useMemo((): IRequestParams => {
    return { url: "", method: "GET", headers: {}, body: null };
  }, []);

  /**
   * useCallback will return a memoized version of the dataHandler
   * that only changes if one of the inputs has changed.
   *
   * SendRequest is returned and that takes two arguments, requestParams
   * and the dataHandler function.
   */
  const sendRequest = React.useCallback(
    async (
      requestParams: IRequestParams = defaultParams,
      dataHandler: (data: IReturnData<T>) => void
    ) => {
      setIsLoading(true);

      // fetch data
      try {
        const response = await fetch(requestParams.url, {
          method: requestParams.method,
          headers: requestParams.headers,
          body: requestParams.body ? requestParams.body : null,
        });

        if (!response.ok) {
          setResponseObject(response);
          throw new Error();
        }

        const data: T = await response.json();

        // send back response data and status
        const returnData: IReturnData<T> = {
          data: data,
          statusCode: response.status,
          statusText: response.statusText,
        };

        setResponseObject(response);

        // dataHandler is defined in the component using this hook
        return dataHandler(returnData);
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [defaultParams]
  );

  // return loading, error and the sendRequest function
  return [isLoading, hasError, sendRequest, responseObject];
};

export default useHttp;
