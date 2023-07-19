import { Table } from 'react-bootstrap'
import { formatDollarAmount, roundDown } from '@utils/index'
import '@styles/PortfolioTable.css'


function PortfolioTable({ holdings, isLoading }) {

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

      <Table hover className='shadow-sm mt-4'>
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