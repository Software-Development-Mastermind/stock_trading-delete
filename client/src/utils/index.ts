import AuthMethods from "./authMethods";
import CompanyMethods from "./companyMethods";
import UserContext from "./userContext";
import { 
    getFormattedFirstWord, 
    formatDate, 
    formatDollarAmount, 
    removeCommas,
    roundDown,
    calculatePercentChange,
    getTimestampForOneYearAgo,
    getTimestampForToday,
    getMonthName,
    getCurrentTime,
    getCurrentDate,
    getUserId 
} from "./utilityFunctions";
import type { 
    StockData, 
    QuoteData, 
    FinancialData,
    User 
} from "./types";

export { 
    AuthMethods, 
    CompanyMethods, 
    getFormattedFirstWord,
    formatDate,
    formatDollarAmount,
    removeCommas,
    getUserId,
    roundDown,
    calculatePercentChange,
    getTimestampForOneYearAgo,
    getTimestampForToday,
    getMonthName,
    getCurrentTime,
    getCurrentDate,
    UserContext
};

export type {
    StockData,
    QuoteData,
    FinancialData,
    User
}