import { useState } from 'react'

import { Table, Container } from 'react-bootstrap'
import { 
  formatDollarAmount, 
  roundDown, 
  getCurrentTime, 
  getCurrentDate 
} from '@/utils/index'
import { TradeModal } from '@/components/index'
import '@styles/PortfolioTable.css'

interface HoldingData {
  name: string;
  symbol: string;
  shares: number;
  cost: number;
  currentValue: number;
  changeValue: number;
  prevCloseValue: number;
}

interface StockData {
  symbol: string;
  name: string;
  description: string;
}

interface PortfolioTableProps {
  holdings: HoldingData[];
  getUserPortfolio: (userId: number) => void;
  userId: number;
}

function PortfolioTable({ holdings, getUserPortfolio, userId }: PortfolioTableProps) {

  const [showTradeModal, setShowTradeModal] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)

  const isEmpty = holdings.length === 0

  const handleHideTradeModal = () => {
    setShowTradeModal(false)
    getUserPortfolio(userId)
  }
  const handleShowTradeModal = (stock: StockData) => {
    setShowTradeModal(true)
    setSelectedStock(stock)
  }

  const renderPortfolioTable = () => {

    if (isEmpty) {
      return (
        <tr>
          <td className='text-center' colSpan={7}>
            Your portfolio is empty. Visit the Trade page to begin investing!
          </td>
        </tr>
      )
    }

    const renderedRows = holdings.map((holding: any, i) => {
      const formattedCost = formatDollarAmount(holding.cost)
      const formattedCurrentValue = formatDollarAmount(holding.currentValue)
      
      const stockGainLossAmount = formatDollarAmount(holding.changeValue)
      const stockGainLossPercentage = ((holding.currentValue - holding.prevCloseValue) / holding.prevCloseValue) * 100
      const roundedStockGainLossPercentage = roundDown(stockGainLossPercentage);
      const stockGainLossColor = stockGainLossPercentage >= 0 ? 'green' : 'red'
      
      const totalGainLossAmount = formatDollarAmount(holding.currentValue - holding.cost)
      const totalGainLossPercentage = roundDown((holding.currentValue - holding.cost) / holding.cost * 100)
      const totalGainLossColor = totalGainLossPercentage >= 0 ? 'green' : 'red'

      return (
        <tr key={i} onClick={() => handleShowTradeModal(holding)}>
          <td className='holding-name'>{holding.name}</td>
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
        <Table hover className='shadow-sm mt-4 holdings-table'>
          <thead>
            <tr className='shadow-sm table-head'>
              <th>Company</th>
              <th>Ticker</th>
              <th>Shares</th>
              <th>Total Cost</th>
              <th>Current Total Value</th>
              <th>Today's Change</th>
              <th>Total Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
          {renderPortfolioTable()}
          </tbody>
        </Table>
        <Container className='mt-3'>
          <p className='timestamp'>
            Last updated: {getCurrentDate()} at {getCurrentTime()}
          </p>
        </Container>
        <TradeModal
          show={showTradeModal}
          hide={handleHideTradeModal}
          selectedStock={selectedStock}
        />
      </>
  )
}

export default PortfolioTable