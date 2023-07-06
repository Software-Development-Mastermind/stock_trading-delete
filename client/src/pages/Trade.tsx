import { useState } from 'react'
import { Search, StockTable, TradeModal } from '@/components'
import { Navbar } from '@components/index'

interface StockData {
  symbol: string;
  name: string;
  description: string;
}

function Trade(): JSX.Element {

  const [stocks, setStocks] = useState<StockData[]>([]);
  const [showTradeModal, setShowTradeModal] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  
  const handleHideTradeModal = () => setShowTradeModal(false)
  const handleShowTradeModal = (stock: StockData) => {
    setShowTradeModal(true)
    setSelectedStock(stock)
  }

  return (
    <>
      <Navbar />
      <Search setStocks={setStocks} />
      <StockTable 
        stocks={stocks}
        showModal={handleShowTradeModal} 
        />
      <TradeModal 
        show={showTradeModal} 
        hide={handleHideTradeModal}
        selectedStock={selectedStock} 
        />
    </>
    )
}

export type { StockData }
export default Trade