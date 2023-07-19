import { Container, Row, Col } from 'react-bootstrap';

function PortfolioSummary({ holdings, userCash, isLoading }) {
  return(
    <Container className='shadow-sm'>
      <Row>
        <Col>
          <h5>Cash: $ {userCash} </h5>
        </Col>
        <Col>
          <h5>Total Value:</h5>
        </Col>
        <Col>
          <h5>Total Gain/Loss:</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSummary;