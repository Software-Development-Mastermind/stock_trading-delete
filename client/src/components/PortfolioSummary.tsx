import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { removeCommas, formatDollarAmount, calculatePercentChange, roundDown } from '@utils/index'


function PortfolioSummary({ holdings, userCash, isLoading }) {

  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalGainLoss, setTotalGainLoss] = useState(0);

  const cash = removeCommas(userCash);

  useEffect (() => {
    getTotalPortfolioValue();
    getTotalGainLoss();
  }, [holdings, userCash]);

  const calculateStockValue = () => {
    if (holdings && holdings.length > 0) {
      const totalStockValue = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.currentValue;
      }, 0);
      return totalStockValue;
    }
  }

  const calculateCost = () => {
    if (holdings && holdings.length > 0) {
      const totalCost = holdings.reduce((accumulator, holding) => {
        return accumulator + removeCommas(holding.cost);
      }, 0);
      return totalCost;
    }
  }
  
  const getTotalPortfolioValue = () => {
    if (holdings && holdings.length > 0) {
      const stockValue = calculateStockValue();
      const portfolio = formatDollarAmount(stockValue + cash);
      setTotalPortfolioValue(portfolio);
    }
  };

  const getTotalGainLoss = () => {
    if (holdings && holdings.length > 0) {
      const totalStockValue = calculateStockValue();
      const totalCost = calculateCost();
      const gainLoss = roundDown(calculatePercentChange(totalStockValue, totalCost));
      setTotalGainLoss(gainLoss);
    }
  }

  return(
    <Container className='shadow-sm'>
      <Row>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5>Cash</h5>
          <h4>$ {userCash} </h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5>Total Value</h5>
          <h4>$ {totalPortfolioValue}</h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5>Total Gain/Loss</h5>
          <h4>{totalGainLoss} %</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSummary;