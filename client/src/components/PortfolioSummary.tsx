import { Container, Row, Col } from 'react-bootstrap';

import { removeCommas, formatDollarAmount } from '@utils/index'

function PortfolioSummary({ holdings, userCash, isLoading }) {

  const getTotalStockValue = () => {
    if (holdings && holdings.length > 0) {
      const totalValue = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.currentValue;
      }, 0);
      return totalValue;
    }
    return 0;
  };

  const totalStockValue = getTotalStockValue();
  const cashToNumber = removeCommas(userCash);
  const totalPortfolioValue = formatDollarAmount(totalStockValue + cashToNumber);


  return(
    <Container className='shadow-sm'>
      <Row>
        <Col>
          <h5>Cash: $ {userCash} </h5>
        </Col>
        <Col>
          <h5>Total Value: {totalPortfolioValue}</h5>
        </Col>
        <Col>
          <h5>Total Gain/Loss:</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSummary;