import Axios from 'axios'

interface ICompanyMethods {
  searchByName: (search: string) => Promise<boolean>
  searchByTicker: (search: string) => Promise<boolean>
}

class CompanyMethods implements ICompanyMethods {

  searchByName = async (search: string) => {
    try {
      const res = await Axios.get(`/api/company_search/${search}`)
      return res.data
    } catch {
      console.log(`Error getting company by name: ${err}`)
    }
  }

  searchByTicker = async (search: string) => {
    try {
      const res = await Axios.get(`/api/ticker_search/${search}`)
      return res.data.result
    } catch (err) {
      console.log(`Error getting company by ticker: ${err}`)
    }
  }

  getFinancials = async (symbol: string) => {
    try {
      const res = await Axios.get(`/api/stock_financials/${symbol}`)
      const financialsData = res.data
      return financialsData
    } catch (err) {
      console.log(`Error getting company financials: ${err}`)
    }
  }

  getQuote = async (symbol: string) => {
    try {
      const res = await Axios.get(`/api/stock_quote/${symbol}`)
      const quoteData = res.data
      return quoteData
    } catch (err) {
      console.log(`Error getting stock quote data: ${err}`)
    }
  }

}

export default CompanyMethods;