export interface ISymbolSearchResult {
  bestMatches?: IStock[];
  ["Error Message"]?: string;
}

export interface IStock {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
  isAdded?: boolean;
}

export interface IPortfolioStock {
  id: string;
  data: IStock;
}

export interface IStockDetails {
  Symbol: string;
  Name: string;
  Address: string;
  MarketCapitalization: string;
  Description: string;
  Currency: string;
  ["Error Message"]?: string;
}

export interface IRequestParams extends RequestInit {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
}

export interface IReturnData<T> {
  data: T;
  statusCode: number;
  statusText: string;
}
