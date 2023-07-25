import { Container, Table } from 'react-bootstrap';
import type { QuoteData } from '@utils/index'

import '@styles/QuoteTable.css'

function QuoteTable({ quote }: QuoteData) {

  const changeColor = quote.change >= 0 ? 'green' : 'red'

  return (
    <Container className='shadow-sm rounded quote-container mb-3'>
      <p className='quote-title'>TODAY'S PERFORMANCE</p>
      <Table borderless size='sm' className='quote-table'>
        <tbody>
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
            <td className='table-title'>Today's High:</td>
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
    </Container>
  )
}

export default QuoteTable;