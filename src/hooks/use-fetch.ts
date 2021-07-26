import * as React from 'react';
import { IStock, ISymbolSearchResult } from '../Interfaces/StockInterfaces';


// const headersInit: HeadersInit = {};

interface RequestParams {
  url: string;
  method?: string;
  headers?: HeadersInit | undefined;
  body?: Record<string, unknown> | null;
}

const defaultParams: RequestParams = {
  url: '',
  method: 'GET',
  headers: {},
  body: null,
};

type CallBack = <T>(data: T) => void;
type SendRequest = (requestParams: RequestParams, callBack : CallBack) => void;

interface Returns {
  isLoading: boolean,
  hasError: boolean,
  sendRequest: SendRequest
}

const useFetch = () : Returns =>  {

  // set states
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  /**
   * useCallback will return a memoized version of the callback
   * that only changes if one of the inputs has changed.
   */
  const sendRequest = React.useCallback(
    async (requestParams: RequestParams = defaultParams, callBack: <T>(data: T) => void) => {

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
        const data = await response.json();

        // function in the component using the useFetch hook.
        // that function decides what to do with the data
        callBack(data);

      } catch (error) {

        setHasError(true);

        console.log(error);

      } finally {

        setIsLoading(false);

      }

    },
    [],
  );

  // return loading, error and the sendRequest function
  return {
    isLoading,
    hasError,
    sendRequest,
  };

};

export default useFetch;
