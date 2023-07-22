import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"

import { CompanyMethods, getFormattedFirstWord } from "@utils/index"

import '@styles/Search.css'

function Search({ setStocks } : any) {

  const [search, setSearch] = useState('')

  const company = new CompanyMethods()
 
  const handleSearch= async (e: any) => {
    e.preventDefault()

    if (search === search.toUpperCase()) {

      const tickers = await company.searchByTicker(search)
      
      const match = tickers.find((ticker: any) => ticker.symbol === search)
      if (match) {
        const description = getFormattedFirstWord(match.description)
        const name = await company.searchByName(description)
        setStocks(name)
        return
      }

      console.log(tickers)
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
            className='searchbar me-2 rounded-pill shadow-sm'
            aria-label='Search'
            onChange={(e) => setSearch(e.target.value)}
            value = {search}
          >
          </Form.Control>
          <Button 
            className='rounded-pill shadow-sm' 
            variant='primary' 
            type='submit'
            >
            Search
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Search