interface StockData {
	symbol: string;
	name: string;
	description: string;
  }

interface PerformanceData {
	"name": string; // "name" or "description"
	"symbol": string; // "symbol"
	"currentPrice": number; // "c"
	"52WeekHigh": number;
	"52WeekHighDate": string;
	"52WeekLow": number; 
	"52WeekLowDate": string;
}
