import { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { CompanyMethods } from '@utils/index'
import type { QuoteData } from '@utils/index'


function TradeTable({ quote }: QuoteData) {

 

  // const [portfolio, setPortfolio] = useState<any>({})
  
  // const company = new CompanyMethods()

  useEffect(() => {
    console.log(user)
  })

  // useEffect(() => {
  //   const portfolioData = getUserPortfolio()
  //   setPortfolio(portfolioData)
  // })

  // const getUserPortfolio = async () => {
  //   const portfolio = await Axios.get(`/api/portfolio/${user.id}`)
  //   console.log(portfolio.data)``
  // }

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
            <td className='text-start'>{100}</td>
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