import { useState } from "react"
import Axios from "axios"

import { Container, Form, Button } from "react-bootstrap"

import '@styles/Search.css'

function Search() {

  const [search, setSearch] = useState('')
  const [companies, setCompanies] = useState([])

  const getCompanyinfo = async (search: string) => {
    const res = await Axios.get(`/api/search/${search}`)
    setCompanies(res.data)
    console.log(companies)
  }
  
  return(
    <div>
      <Container className='search-container shadow rounded'>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search by ticker or company name'
            className='searchbar me-2 rounded-pill shadow-sm'
            aria-label='Search'
            onChange={(e) => setSearch(e.target.value)}
            value = {search}
          >
          </Form.Control>
          <Button className='rounded-pill shadow-sm' variant='primary'>
            Search
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default Search