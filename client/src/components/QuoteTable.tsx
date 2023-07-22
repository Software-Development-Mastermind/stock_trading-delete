import { Table } from 'react-bootstrap';
import type { QuoteData } from '@utils/index'

function QuoteTable({ quote }: QuoteData) {

  const changeColor = quote.change >= 0 ? 'green' : 'red'

  return (
    <>
      <p>TODAY</p>
      <Table borderless size='sm'>
        <tbody>
          <tr>
            <td>CURRENT SHARE PRICE:</td>
            <td className='text-start'>{quote.currentPrice != null ? `$ ${quote.currentPrice}` : 'Temporarily unavailable.'}</td>
          </tr>
          <tr>
            <td>Open Price:</td>
            <td className='text-start'>{quote.openPrice != null ? `$ ${quote.openPrice}` : 'Temporarily unavailable.'}</td>
          </tr>
          <tr>
            <td>Change:</td>
            <td className='text-start'>
              {quote.change != null ? (
                <>
                  <span className={changeColor}>$ {quote.change}</span>
                  <span className={changeColor}> ({quote.percentChange}%)</span>
                </>
              ) : (
                'Temporarily unavailable.'
              )}
            </td>
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
    </>
  )
}

export default QuoteTable;