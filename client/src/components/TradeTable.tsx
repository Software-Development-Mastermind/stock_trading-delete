import { Table } from 'react-bootstrap';

function TradeTable({ quote }) {
  return (
    <Table borderless size='sm'>
      <tbody>
        <p>TRADE</p>
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
  );
}

export default TradeTable;