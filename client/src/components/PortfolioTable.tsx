import { useState } from 'react'

import { Table } from 'react-bootstrap'
import { formatDollarAmount, roundDown } from '@utils/index'
import { TradeModal } from '@components/index'
import '@styles/PortfolioTable.css'
import { calculatePercentChange } from '@/utils'

interface StockData {
  symbol: string;
  name: string;
  description: string;
}

function PortfolioTable({ holdings, isLoading }) {

  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)

  const handleHideTradeModal = () => setShowTradeModal(false)
  const handleShowTradeModal = (stock: StockData) => {
    setShowTradeModal(true)
    setSelectedStock(stock)
  }

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
      
      const stockGainLossAmount = formatDollarAmount(holding.currentValue - holding.openValue)
      const stockGainLossPercentage = calculatePercentChange(holding.currentValue, holding.openValue)
      const roundedStockGainLossPercentage = roundDown(stockGainLossPercentage);
      const stockGainLossColor = stockGainLossPercentage >= 0 ? 'green' : 'red'
      
      const totalGainLossAmount = formatDollarAmount(holding.currentValue - holding.cost)
      const totalGainLossPercentage = roundDown((holding.currentValue - holding.cost) / holding.cost * 100)
      const totalGainLossColor = totalGainLossPercentage >= 0 ? 'green' : 'red'

      return (
        <tr key={i} onClick={() => handleShowTradeModal(holding)}>
          <td>{holding.name}</td>
          <td>{holding.symbol}</td>
          <td>{holding.shares}</td>
          <td>$ {formattedCost}</td>
          <td>$ {formattedCurrentValue}</td>
          <td>
             $ {stockGainLossAmount + ' '}
             (
            <span className={stockGainLossColor}>
              {roundedStockGainLossPercentage}%
            </span>
             )
          </td>
          <td>
            $ {totalGainLossAmount + ' '}
            (
            <span className={totalGainLossColor}>
              {totalGainLossPercentage}%
            </span>
            )
          </td>
        </tr>
      );
    });

    return renderedRows;
  }

  return (
      <>
        <Table hover className='shadow-sm mt-4'>
          <thead>
            <tr className='table-head shadow-sm'>
              <th>Company</th>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Total Cost</th>
              <th>Current Total Value</th>
              <th>Today's Gain/Loss</th>
              <th>Total Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
          {renderPortfolioTable()}
          </tbody>
        </Table>
        <TradeModal
          show={showTradeModal}
          hide={handleHideTradeModal}
          selectedStock={selectedStock} 
        />
      </>
  )
}

export default PortfolioTable