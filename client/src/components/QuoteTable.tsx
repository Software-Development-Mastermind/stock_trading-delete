import { Table } from 'react-bootstrap';

function QuoteTable({ quote }) {
  return (
    <Table borderless size='sm'>
      <tbody>
        <p>TODAY</p>
        <tr>
          <td>Open Price:</td>
          <td className='text-start'>{quote.openPrice != null ? `$ ${quote.openPrice}` : 'Temporarily unavailable.'}</td>
        </tr>
        <tr>
          <td>Change:</td>
          <td className='text-start'>{quote.change != null ? `$ ${quote.change} (${quote.percentChange}%)` : 'Temporarily unavailable.'}</td>
        </tr>
        <tr>
          <td>Today's High:</td>
          <td className='text-start'>{quote.dailyHigh != null ? `$ ${quote.dailyHigh}` : 'Temporarily unavailable.'}</td>
        </tr>
        <tr>
          <td>Today's Low:</td>
          <td className='text-start'>{quote.dailyLow != null ? `$ ${quote.dailyLow}` : 'Temporarily unavailable.'}</td>
        </tr>
        <tr>
          <td>Previous Close:</td>
          <td>{quote.previousClose != null ? `$ ${quote.previousClose}` : 'Temporarily unavailable.'}</td>
        </tr>
      </tbody>
    </Table>
  )
}