import { useState } from "react"
import Axios from "axios"

import { Container, Form, Button } from "react-bootstrap"

import '@styles/Search.css'

function Search({ setCompanies } : any) {

  const [search, setSearch] = useState('')
  
  const handleSearch= async (e: any) => {
    e.preventDefault()
    const res = await Axios.get(`/api/stock_search/${search}`)
    console.log(res)
    setCompanies(res.data)
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