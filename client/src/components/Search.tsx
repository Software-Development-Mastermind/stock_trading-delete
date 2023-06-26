import { Container, Form, Button } from "react-bootstrap"

import '@styles/Search.css'

function Search() {
  return(
    <div>
      <Container className='search-container shadow rounded'>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search by ticker or company name'
            className='searchbar me-2 rounded-pill shadow-sm'
            aria-label='Search'
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