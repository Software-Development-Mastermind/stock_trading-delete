import { Container, Row, Col, Form, Button } from "react-bootstrap"

import '@styles/Search.css'

function Search() {
  return(
    <div>
      <Container className='search-container'>
        <Form className='d-flex'>
          <Form.Control
            type='search'
            placeholder='Search'
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