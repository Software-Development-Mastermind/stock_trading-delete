import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"

import { CompanyMethods } from "@utils/index"

import '@styles/Search.css'

function Search({ setStocks } : any) {

  const [search, setSearch] = useState('')

  const company = new CompanyMethods()
  
  const handleSearch= async (e: any) => {
    e.preventDefault()

    if (search.length === 4 && search === search.toUpperCase()) {
      const tickerRes = await company.searchByTicker(search)
      setStocks(tickerRes)
    } else {
      try {
        const nameRes = await company.searchByName(search)
        setStocks(nameRes)
      } catch {
        console.log('Error getting company by name')
      }
    }
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