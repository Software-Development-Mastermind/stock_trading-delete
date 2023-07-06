import { useState } from 'react'
import { Search, StockTable, TradeModal } from '@/components'
import { Navbar } from '@components/index'

interface Company {
  symbol: string;
  name: string;
  description: string;
}

function Trade(): JSX.Element {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [showTradeModal, setShowTradeModal] = useState<boolean>(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  
  const handleHideTradeModal = () => setShowTradeModal(false)
  const handleShowTradeModal = (company: Company) => {
    setShowTradeModal(true)
    setSelectedCompany(company)
  }

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
        company={selectedCompany} 
        />
    </>
    )
}

export type { Company }
export default Trade