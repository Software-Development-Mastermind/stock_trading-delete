import { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { CompanyMethods, UserContext } from '@utils/index'
import type { QuoteData } from '@utils/index'
import { get } from 'http';


function TradeTable({ quote }: QuoteData) {

  const user = useContext(UserContext)
  const userId = user.id
  
  const [userCash, setUserCash] = useState<any>(0)
  const [portfolio, setPortfolio] = useState<any>({})
  
  useEffect(() => {
    getUserCash(userId)
  }, [])

  const getUserCash = async (userId) => {
    const res= await Axios.get(`/api/get_cash/${userId}`)
    console.log(res.data.cash)
    setUserCash(res.data.cash)
  }

  const getUserPortfolio = async (userId) => {
    const portfolioData = await Axios.get(`/api/get_portfolio/${userId}`)
    console.log(portfolioData)
    setPortfolio(portfolioData)
  }

  return (
    <>
      <p>TRADE</p>
      <Table borderless size='sm'>
        <tbody>
          <tr>
            <td>Shares Owned:</td>
            <td className='text-start'>15</td>
          </tr>
          <tr>
            <td>Cash Balance:</td>
            <td className='text-start'>$ {userCash}</td>
          </tr>
          <tr>
            <td>Buying Power:</td>
            <td className='text-start'>Shares go here</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TradeTable;