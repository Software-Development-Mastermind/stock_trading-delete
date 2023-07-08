import { Table } from 'react-bootstrap';
import type { QuoteData } from '@utils/index'

function TradeTable({ quote }: QuoteData) {
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
            <td className='text-start'>$100,000</td>
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