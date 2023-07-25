import { Container, Row, Col } from 'react-bootstrap';

function CurrentSharePrice({ quote }) {
  return (
    <Container className='shadow-sm rounded mb-3'>
      <Row>
        <Col>
          <h1>Current Share Price</h1>
        </Col>
        <Col>
          <h1>$ {quote.currentPrice}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default CurrentSharePrice;