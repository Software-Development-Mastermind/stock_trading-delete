import Axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { UserContext, formatDollarAmount, CompanyMethods, roundDown } from '@utils/index'
import '@styles/PortfolioTable.css'


function PortfolioTable({ holdings, isLoading }) {

  // const user = useContext(UserContext)
  // const userId = user.id
  
  // const company = new CompanyMethods()

  // const [holdings, setHoldings] = useState([])
  // const [isLoading, setIsLoading] = useState(true)
 
  // useEffect(() => {
  //   getUserPortfolio(userId)
  // }, [])

  // useEffect(() => {
  //   holdings.length !== 0 ? setIsLoading(false) : setIsLoading(true);
  // }, [holdings]);

  // const getUserPortfolio = async (userId: number) => {
  //   setIsLoading(true);
  //   const res = await Axios.get(`/api/get_portfolio/${userId}`);
  //   const portfolioData = res.data;
  
  //   const holdingsWithCurrentValue = await Promise.all(
  //     portfolioData.map(async (holding) => {
  //       const symbol = holding.symbol;
  //       const quote = await company.getQuote(symbol);
  //       const sharePrice = quote.c;
  //       const shares = holding.shares;
  //       const currentValue = sharePrice * shares;
  
  //       return { ...holding, currentValue };
  //     })
  //   );
  //   setHoldings(holdingsWithCurrentValue);
  //   setIsLoading(false);
  // };
    
  const renderPortfolioTable = () => {

    if (isLoading) {
      return (
        <tr>
          <td>Loading...</td>
        </tr>
      )
    }

    const renderedRows = holdings.map((holding: any, i) => {
      const formattedCost = formatDollarAmount(holding.cost)
      const formattedCurrentValue = formatDollarAmount(holding.currentValue)
      const gainLoss = roundDown((holding.currentValue - holding.cost) / holding.cost * 100)
      const gainLossColor = gainLoss >= 0 ? 'green' : 'red'

      return (
        <tr key={i}>
          <td>{holding.name}</td>
          <td>{holding.symbol}</td>
          <td>{holding.shares}</td>
          <td>$ {formattedCost}</td>
          <td>$ {formattedCurrentValue}</td>
          <td>
            <span className={gainLossColor}>
              {gainLoss}%
            </span>
          </td>
        </tr>
      );
    });

    return renderedRows;
  }

  return (

      <Table hover className='shadow-sm'>
        <thead>
          <tr className='table-head shadow-sm'>
            <th>Company</th>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Cost</th>
            <th>Current Value</th>
            <th>Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
        {renderPortfolioTable()}
        </tbody>
      </Table>
  )
}

export default PortfolioTable