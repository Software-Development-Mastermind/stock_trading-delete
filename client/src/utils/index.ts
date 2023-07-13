import AuthMethods from "./authMethods";
import CompanyMethods from "./companyMethods";
import UserContext from "./userContext";
import { 
    getFormattedFirstWord, 
    formatDate, 
    formatDollarAmount, 
    getUserId 
} from "./utilityFunctions";
import type { 
    StockData, 
    QuoteData, 
    FinancialData 
} from "./types";

export { 
    AuthMethods, 
    CompanyMethods, 
    getFormattedFirstWord,
    formatDate,
    formatDollarAmount,
    getUserId,
    UserContext
};

export type {
    StockData,
    QuoteData,
    FinancialData,
}