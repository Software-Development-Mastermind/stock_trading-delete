import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Row, Col, Form, Button, ButtonGroup, ToggleButton, Table } from 'react-bootstrap';
import { UserContext, formatDollarAmount, removeCommas } from '@utils/index'
import type { QuoteData } from '@utils/index'

import '@styles/TradeForm.css'


function TradeForm({ quote, selectedStock }: QuoteData) {

  const user = useContext(UserContext)
  const userId = user.id
  const symbol = selectedStock.symbol.toString()
  const price = quote.currentPrice

  const [userCash, setUserCash] = useState<any>(0)
  const [portfolio, setPortfolio] = useState<any>([])
  const [sharesOwned, setSharesOwned] = useState<any>(0)
  const [buyingPower, setBuyingPower] = useState<any>(0)
  const [checked, setChecked] = useState('buy')
  const [shares, setShares] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      await getUserPortfolio(userId);
      await getUserCash(userId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    getSharesOwned(symbol)
  }, [portfolio])

  useEffect(() => {
    calculateBuyingPower()
  }, [userCash, price]);

  const getUserPortfolio = async (userId: number) => {
    const portfolioRes = await Axios.get(`/api/get_portfolio/${userId}`)
    const portfolioData = Array.isArray(portfolioRes.data) 
      ? portfolioRes.data 
      : [portfolioRes.data]
    setPortfolio(portfolioData)
  }

  const getUserCash = async (userId: number) => {
    const res= await Axios.get(`/api/get_cash/${userId}`)
    const formattedCash = formatDollarAmount(res.data.cash)
    setUserCash(formattedCash)
  }

  const getSharesOwned = (symbol: string) => {
    const ownedStock = portfolio.find((stock: any) => stock.symbol === symbol)
    console.log(ownedStock)
    if (ownedStock) {
      setSharesOwned(ownedStock.shares)
    }
  }

  const calculateBuyingPower = () => {
    const formattedCash = removeCommas(userCash)
    const buyingPower = Math.floor(formattedCash / price)
    setBuyingPower(buyingPower)
  }

  const calculateTransactionPrice = () => {
    return formatDollarAmount(price * shares)
  }

  const calculateBalanceAfterTransaction = () => {
    const formattedCash = removeCommas(userCash)
    const transactionPrice = removeCommas(price) * shares

   return checked === 'buy' 
    ? formatDollarAmount(formattedCash - transactionPrice) 
    : formatDollarAmount(formattedCash + transactionPrice)
  }

  const handleToggleButtonChange = (value: string) => {
    setChecked(value);
  }

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShares(Number(e.target.value));
  }

  return (
    <div className='trade-form-container shadow-sm'>
      <p>TRADE</p>
        <Table borderless size='sm'>
          <tbody>
            <tr>
              <td>Shares Owned:</td>
              <td className='text-start'>{sharesOwned}</td>
            </tr>
            <tr>
              <td>Cash Balance:</td>
              <td className='text-start'>$ {userCash}</td>
            </tr>
            <tr>
              <td>Buying Power:</td>
              <td className='text-start'>{buyingPower} shares</td>
            </tr>
          </tbody>
        </Table>
      <Form>
        <Row>
          <Col xs={12} sm={2}>
            <ButtonGroup className="mb-3">
              <ToggleButton
                className="shadow-sm"
                id="buy-button"
                type="checkbox"
                variant="outline-primary"
                value="buy"
                checked={checked === 'buy'}
                onClick={() => {
                  handleToggleButtonChange('buy');
                }}
              >
                Buy
              </ToggleButton>
              <ToggleButton
                className="shadow-sm"
                id="sell-button"
                type="checkbox"
                variant="outline-primary"
                value="sell"
                checked={checked === 'sell'}
                onClick={() => {
                  handleToggleButtonChange('sell');
                }}
              >
                Sell
              </ToggleButton>
            </ButtonGroup>
          </Col>
          <Col xs={2} sm={2}>
            <Form.Group className="mb-3">
              <Form.Control 
                className="shadow-sm" 
                type="number" 
                placeholder="0"
                value={shares}
                onChange = {handleSharesChange}
                />
            </Form.Group>
          </Col>
          <Col xs={8} sm={5} className='d-flex align-items-center'>
            <p className='shares-identifier'>
              shares of {selectedStock.name} ({selectedStock.symbol})
            </p>
          </Col>
          </Row>
            <p className='mt-1'>{checked === 'sell' 
              ? `Total proceeds: $ ${calculateTransactionPrice()}` 
              : `Total cost: $ ${calculateTransactionPrice()}`}
            </p>
            <p className='mt-1'>{checked === 'sell' 
              ? `Cash balance after sale: $ ${calculateBalanceAfterTransaction()}`
              : `Cash balance after purchase: $ ${calculateBalanceAfterTransaction()}`
              }
            </p>
          <Col xs={12}>
            <Button className="shadow-sm">{checked === 'sell' ? 'Complete sale' : 'Complete purchase'}</Button>
          </Col>
      </Form>
    </div>
  );
}

export default TradeForm;