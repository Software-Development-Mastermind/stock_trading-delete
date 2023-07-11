import AuthMethods from "./authMethods";
import CompanyMethods from "./companyMethods";
import UserContext from "./userContext";
import { getFormattedFirstWord, formatDate, getUserId } from "./helperFunctions";
import type { StockData, QuoteData, FinancialData } from "./types";

export { 
    AuthMethods, 
    CompanyMethods, 
    getFormattedFirstWord,
    formatDate,
    UserContext,
    getUserId
};

export type {
    StockData,
    QuoteData,
    FinancialData
}