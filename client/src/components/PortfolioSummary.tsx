import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { removeCommas, formatDollarAmount } from '@utils/index'
import { get } from 'http';

function PortfolioSummary({ holdings, userCash, isLoading }) {

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  useEffect (() => {
    getTotalPortfolioValue();
  }, [holdings, userCash]);

  const getTotalPortfolioValue = () => {
    const cashToNumber = removeCommas(userCash);
    if (holdings && holdings.length > 0) {
      const totalValue = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.currentValue;
      }, 0);
      const portfolio = formatDollarAmount(totalValue + cashToNumber);
      setTotalPortfolioValue(portfolio);
    }
  };

  return(
    <Container className='shadow-sm'>
      <Row>
        <Col>
          <h5>Cash: $ {userCash} </h5>
        </Col>
        <Col>
          <h5>Total Value: $ {totalPortfolioValue}</h5>
        </Col>
        <Col>
          <h5>Total Gain/Loss:</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSummary;