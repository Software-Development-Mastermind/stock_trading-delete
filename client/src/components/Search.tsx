import { Container, Row, Col, Form, Button } from "react-bootstrap"

function Search() {
  return(
    <div>
      <Container className='search-container shadow-sm'>
        <Row>
            <Col sm={6}>
              <Form className='d-flex'>
                <Form.Control
                  type='search'
                  placeholder='Search'
                  className='me-2 rounded-pill shadow'
                  aria-label='Search'
                >
                </Form.Control>
                <Button className='rounded-pill shadow' variant='primary'>
                  Search
                </Button>
              </Form>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Search