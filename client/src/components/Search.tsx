import { useState } from "react"
import Axios from "axios"

import { Container, Form, Button } from "react-bootstrap"

import '@styles/Search.css'

function Search({ setCompanies } : any) {

  const [search, setSearch] = useState('')
  
  const handleSearch= async (e: any) => {
    e.preventDefault()

    if (search.length === 4 && search === search.toUpperCase()) {
      try {
        const res = await Axios.get(`/api/ticker_search/${search}`)
        console.log(res.data.result)
        setCompanies(res.data.result)
      } catch {
        console.log('Error getting company by ticker')
      }
    } else {
      try{
        const res = await Axios.get(`/api/company_search/${search}`)
        console.log(res.data)
        setCompanies(res.data)
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