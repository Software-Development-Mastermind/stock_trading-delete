import { useState } from 'react'
import { Search, StockTable, TradeModal } from '@/components'
import { Navbar } from '@components/index'

function Trade() {

  const [companies, setCompanies] = useState([])
  const [showTradeModal, setShowTradeModal] = useState(false)
  
  const handleHideTradeModal = () => setShowTradeModal(false)
  const handleShowTradeModal = () => setShowTradeModal(true)

  return (
    <>
      <Navbar />
      <Search setCompanies={setCompanies} />
      <StockTable 
        companies={companies}
        showModal={handleShowTradeModal} 
        />
      <TradeModal 
        show={showTradeModal} 
        hide={handleHideTradeModal} 
        />
    </>
    )
}

export default Trade