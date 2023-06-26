import { useState } from 'react'
import { Search, StockTable } from '@/components'
import { Navbar } from '@components/index'

function Trade() {

  const [companies, setCompanies] = useState([])

  return (
    <>
      <Navbar />
      <Search setCompanies={setCompanies} />
      <StockTable companies={companies} />
    </>
    )
}

export default Trade