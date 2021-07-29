import * as React from 'react';

interface IRequestParams {
  url: string;
  method?: string;
  headers?: HeadersInit | undefined;
  body?: Record<string, unknown> | null;
}

/**
 * Generic interface for the dataHandler function
 * that is declared in the component using this hook
 */
interface IGenericDataHandler<T> {
  (arg: T): void;
}

// Return type for the generic dataHandler function
type GenericDataHandler = <T>(data: T) => void;

// Return type for the sendRequest function
type SendRequest = (requestParams: IRequestParams, dataHandler: GenericDataHandler) => void;

// Declare a tuple with return types
let Returns: [boolean, boolean, SendRequest];

/**
 *
 * @returns isLoading, hasError and sendRequest function to make API-calls
 * @callback sendRequest takes two parameters:
 * requestParams
 * dataHandler
 */
const useHttp = <T extends Partial<T>>(): typeof Returns => {
  // set states
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const defaultParams: IRequestParams = React.useMemo((): IRequestParams => {
    return { url: '', method: 'GET', headers: {}, body: null };
  }, []);

  /**
   * useCallback will return a memoized version of the dataHandler
   * that only changes if one of the inputs has changed.
   *
   * SendRequest is returned and that takes two arguments, requestParams
   * and the dataHandler function.
   */
  const sendRequest = React.useCallback(
    async (requestParams: IRequestParams = defaultParams, dataHandler: IGenericDataHandler<T>) => {
      setIsLoading(true);

      // fetch data
      try {
        const response = await fetch(requestParams.url, {
          method: requestParams.method,
          headers: requestParams.headers,
          body: requestParams.body ? JSON.stringify(requestParams.body) : null,
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data: T = await response.json();

        // function in the component using the useFetch hook.
        // that function decides what to do with the data
        dataHandler(data);
      } catch (error) {
        setHasError(true);

        console.log(error);
      } finally {
        setIsLoading(false);
      }
    },
    [defaultParams]
  );

  // return loading, error and the sendRequest function
  return [isLoading, hasError, sendRequest];
};

export default useHttp;
