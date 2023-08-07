import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"

import { CompanyMethods, getFormattedFirstWord } from "@/utils/index"

import '@styles/Search.css'

interface SearchProps {
  setStocks: (stocks: any) => void
  hasSearched: () => void
}

function Search({ setStocks, hasSearched }: SearchProps) {

  const [search, setSearch] = useState<string>('')

  const company = new CompanyMethods()
 
  const handleSearch= async (e: any) => {
    e.preventDefault()
    hasSearched()

    if (search === search.toUpperCase()) {

      const tickers = await company.searchByTicker(search)
      
      const match = tickers.find((ticker: any) => ticker.symbol === search)
      if (match) {
        const description = getFormattedFirstWord(match.description)
        const name = await company.searchByName(description)
        setStocks(name)
        return
      }
      setStocks(tickers)
      }

    const names = await company.searchByName(search)
    setStocks(names)

  }
   
  return(
    <div>
      <Container className='search-container'>
        <Form className='d-flex' onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Search by ticker or company name'
            className='searchbar me-2 shadow-sm'
            aria-label='Search'
            onChange={(e) => setSearch(e.target.value)}
            value = {search}
          >
          </Form.Control>
          <Button 
            className='shadow-sm search-btn' 
            variant='primary' 
            type='submit'
            >
            Search
          </Button>
        </Form>
        <p className='mt-3 search-note'>Use capital letters to search by ticker symbol (e.g. AAPL for Apple, Inc.)</p>
      </Container>
    </div>
  )
}

export default Search