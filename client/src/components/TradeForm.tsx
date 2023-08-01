import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';

import {
  Row, 
  Col, 
  Form, 
  Button, 
  ButtonGroup, 
  ToggleButton, 
  Table, 
  Container 
} from 'react-bootstrap';

import { 
  UserContext, 
  formatDollarAmount, 
  removeCommas 
} from '@utils/index'

import type { QuoteData } from '@utils/index'

import '@styles/TradeForm.css'

function TradeForm({ quote, selectedStock }: QuoteData) {

  const user = useContext(UserContext)
  const userId = user.id
  const symbol = selectedStock.symbol.toString()
  const price = formatDollarAmount(quote.currentPrice)
  
  const [userCash, setUserCash] = useState<string | number>(0)
  const [portfolio, setPortfolio] = useState<any>([])
  const [sharesOwned, setSharesOwned] = useState<any>(0)
  const [buyingPower, setBuyingPower] = useState<any>(0)
  const [checked, setChecked] = useState('buy')
  const [shares, setShares] = useState(0)

  const isInsufficientShares = checked === 'sell' && shares > sharesOwned;
  const exceedsBuyingPower = checked === 'buy' && (shares > 0 && shares > buyingPower);

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
    const res = await Axios.get(`/api/get_cash/${userId}`)
    const formattedCash = formatDollarAmount(res.data.cash)
    console.log(`Get user cash: ${formattedCash}`)
    setUserCash(formattedCash)
  }

  const updateUserCash = async (userId: number, cash: number) => {
    try {
      const res = await Axios.post(`/api/update_cash/${userId}`, {
        userId,
        cash
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const getSharesOwned = (symbol: string) => {
    const ownedStock = portfolio.find((stock: any) => stock.symbol === symbol)
    if (ownedStock) {
      setSharesOwned(ownedStock.shares)
    }
  }

  const buyStock = async (userId, symbol, name, shares, cost) => {
    try {
      const res = await Axios.post(`/api/buy_stock/${userId}`, {
        userId,
        symbol,
        name,
        shares,
        cost
      })
      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const sellStock = async (userId, symbol, shares, price) => {
    try {
      const res = await Axios.post(`/api/sell_stock/${userId}`, {
        userId,
        symbol,
        shares,
        price
      })
    } catch (err) {
      console.log(err)
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
    const transactionAmount = price * shares
    
    return checked === 'buy' 
      ? formatDollarAmount(formattedCash - transactionAmount) 
      : formatDollarAmount(formattedCash + transactionAmount)
  }

  const handleToggleButtonChange = (value: string) => {
    setChecked(value);
  }

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShares(Number(e.target.value));
  }

  const handleTransaction = async (e: any) => {
    e.preventDefault()
    const transactionAmount = price * shares
    const updatedBalance = removeCommas(calculateBalanceAfterTransaction())
    if (checked === 'buy') {
      buyStock(userId, symbol, selectedStock.name, shares, transactionAmount)
      updateUserCash(userId, updatedBalance)
      setSharesOwned(sharesOwned + shares)
    } else {
      sellStock(userId, symbol, shares, transactionAmount)
      updateUserCash(userId, updatedBalance)
      setSharesOwned(sharesOwned - shares)
    }
    setUserCash(formatDollarAmount(updatedBalance))
  }


  return (
    <Container className='trade-form-container shadow-sm mt-3'>
      <p className='trade-title'>TRADE</p>
        <Table borderless size='sm'>
          <tbody>
            <tr>
              <td className='trade-table trade-header current-price'>Current Share Price:</td>
              <td className='text-start trade-table current-price'>$ {price}</td>
            </tr>
            <tr>
              <td className='trade-table trade-header'>Shares Owned:</td>
              <td className='text-start trade-table'>{sharesOwned}</td>
            </tr>
            <tr>
              <td className='trade-table'>Cash Balance:</td>
              <td className='text-start trade-table'>$ {userCash}</td>
            </tr>
            <tr>
              <td className='trade-table'>Buying Power:</td>
              <td className='text-start trade-table'>{buyingPower} shares</td>
            </tr>
          </tbody>
        </Table>
      <Form onSubmit={handleTransaction}>
        <Row>
          <Col xs={12} sm={2}>
            <ButtonGroup className="mb-3">
              <ToggleButton
                className={`shadow-sm toggle-btn ${checked === 'buy' ? 'checked' : 'not-checked'}`}
                id="buy-button"
                type="checkbox"
                variant="outline"
                value="buy"
                checked={checked === 'buy'}
                onClick={() => {
                  handleToggleButtonChange('buy');
                }}
              >
                Buy
              </ToggleButton>
              <ToggleButton
                className={`shadow-sm toggle-btn ${checked === 'sell' ? 'checked' : 'not-checked'}`}
                id="sell-button"
                type="checkbox"
                variant="outline"
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
                min={0}
                max={checked === 'sell' ? sharesOwned : undefined}
                value={shares === 0 ? "" : shares}
                onChange = {handleSharesChange}
                />
            </Form.Group>
          </Col>
          <Col xs={8} sm={5} className='d-flex align-items-center'>
            <p className='shares-identifier'>
              share(s) of {selectedStock.name} ({selectedStock.symbol})
            </p>
          </Col>
          </Row>
            <Table borderless size='sm'>
              <tbody>
                <tr>
                  <td className='trade-table trade-header'>{checked === 'sell' 
                    ? `Total proceeds:` 
                    : `Total cost:`
                    }
                  </td>
                  <td className='text-start trade-table'>$ {calculateTransactionPrice()}</td>
                </tr>
                <tr>
                  <td className='trade-table'>{checked === 'sell' 
                    ? `Cash balance after sale:`
                    : `Cash balance after purchase:`
                    }
                  </td>
                  <td className='text-start trade-table'>$ {calculateBalanceAfterTransaction()}</td>
                </tr>
              </tbody>
            </Table>
          <Col xs={12}>
          <div className='d-grid'>
            <Button
              className={`shadow-sm transaction-btn ${exceedsBuyingPower ? 'insufficient-funds' : ''}`}
              type='submit'
              disabled={shares === 0 || isInsufficientShares || exceedsBuyingPower}
              >
                {exceedsBuyingPower
                  ? 'Insufficient Funds'
                  : checked === 'sell'
                  ? 'Sell Share(s)'
                  : 'Purchase Share(s)'
                }
          </Button>
        </div>
          </Col>
      </Form>
    </Container>
  );
}

export default TradeForm;