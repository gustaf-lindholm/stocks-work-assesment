export interface IStock {
  id: string,
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

export interface IStockDetails {
  Symbol: string;
  Name: string;
  Address: string;
  MarketCapitalization: string;
  Description: string;
  Currency: string;
}