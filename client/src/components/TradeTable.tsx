import { useContext } from 'react';
import Axios from 'axios';
import { Table } from 'react-bootstrap';
import { AuthContext, CompanyMethods } from '@utils/index'
import type { QuoteData } from '@utils/index'

function TradeTable({ quote }: QuoteData) {

  const { user } = useContext(AuthContext)
  
  const company = new CompanyMethods()

  const getUserPortfolio = async () => {
    portfolio = await Axios.get(`/api/portfolio/${user.id}`)
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
            <td className='text-start'>{}</td>
          </tr>
          <tr>
            <td>Buying Power:</td>
            <td className='text-start'>50 shares</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default TradeTable;