import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { UserContext, formatDollarAmount, removeCommas } from '@utils/index'
import type { QuoteData } from '@utils/index'




function TradeTable({ quote, selectedStock }: QuoteData) {

  const user = useContext(UserContext)
  const userId = user.id
  const symbol = selectedStock.symbol.toString()
  const price = quote.currentPrice
  
  const [userCash, setUserCash] = useState<any>(0)
  const [portfolio, setPortfolio] = useState<any>([])
  const [sharesOwned, setSharesOwned] = useState<any>(0)
  const [buyingPower, setBuyingPower] = useState<any>(0)

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

  return (
    <>
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
    </>
  );
}

export default TradeTable;