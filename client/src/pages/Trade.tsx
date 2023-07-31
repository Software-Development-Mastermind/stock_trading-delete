import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, StockTable, TradeModal, Navbar } from '@/components/index'
import { AuthMethods } from '@/utils/index'

interface StockData {
  symbol: string;
  name: string;
  description: string;
}

function Trade(): JSX.Element {

  const navigate = useNavigate()
  const auth = new AuthMethods()

  const [stocks, setStocks] = useState<StockData[]>([]);
  const [showTradeModal, setShowTradeModal] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null)
  
  const handleHideTradeModal = () => setShowTradeModal(false)
  const handleShowTradeModal = (stock: StockData) => {
    setShowTradeModal(true)
    setSelectedStock(stock)
  }

  useEffect(() => {
    if (!auth.loggedIn()) {navigate('/')}
    }, []);

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