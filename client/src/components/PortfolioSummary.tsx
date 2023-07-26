import { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import { removeCommas, formatDollarAmount, calculatePercentChange, roundDown } from '@utils/index'

import '@styles/PortfolioSummary.css'

function PortfolioSummary({ holdings, userCash, isLoading }) {

  const [stockValue, setStockValue] = useState(0);
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [totalGainLoss, setTotalGainLoss] = useState(0);


  const cash = removeCommas(userCash);
  const gainLossColor = totalGainLoss >= 0 ? 'green' : 'red';

  useEffect (() => {
    calculateStockValue();
    getTotalPortfolioValue();
    getTotalGainLoss();
  }, [holdings, userCash]);

  const calculateStockValue = () => {
    if (holdings && holdings.length > 0) {
      const totalStockValue = holdings.reduce((accumulator, holding) => {
        return accumulator + holding.currentValue;
      }, 0);
      setStockValue(totalStockValue);
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
      const portfolio = formatDollarAmount(stockValue + cash);
      setTotalPortfolioValue(portfolio);
    }
  }

  const getTotalGainLoss = () => {
    if (holdings && holdings.length > 0) {
      const totalCost = calculateCost();
      const gainLoss = roundDown(calculatePercentChange(stockValue, totalCost));
      setTotalGainLoss(gainLoss);
    }
  }

  return(
    <Container className='shadow-sm summary-container'>
      <Row>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5 className='summary-header'>Cash</h5>
          <h4 className='summary-content'>$ {userCash} </h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5 className='summary-header'>Stock Value</h5>
          <h4 className='summary-content'>$ {formatDollarAmount(stockValue)}</h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5 className='summary-header'>Total Value</h5>
          <h4 className='summary-content'>$ {totalPortfolioValue}</h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5 className='summary-header'>Today's Gain/Loss</h5>
          <h4 className={gainLossColor}>{totalGainLoss} %</h4>
        </Col>
        <Col className='d-flex flex-column justify-content-center align-items-center'>
          <h5 className='summary-header'>Total Gain/Loss</h5>
          <h4 className={gainLossColor}>{totalGainLoss} %</h4>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioSummary;