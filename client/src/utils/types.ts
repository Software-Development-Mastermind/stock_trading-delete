interface StockData {
  symbol: string;
  name: string;
  description: string;
}

interface QuoteData {
  "currentPrice": number;
  "change": number;
  "percentChange": number;
  "dailyHigh": number;
  "dailyLow": number;
  "openPrice": number;
  "previousClose": number;
}

interface FinancialData {
  "52WeekHigh": number;
  "52WeekHighDate": string;
  "52WeekLow": number; 
  "52WeekLowDate": string;
}

export type {
	StockData,
	QuoteData,
	FinancialData
};