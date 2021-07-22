// takes currency and market capitalizaion and returns formatted string
// with currency symbol and rounded amount
export const currencyFormatter = (currency: string, MarketCapitalization: number) : string => {
  return new Intl.NumberFormat('sv-SE', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 3
  }).format(MarketCapitalization);
}
