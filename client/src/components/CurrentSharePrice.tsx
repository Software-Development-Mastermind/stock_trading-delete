import { Container, Table, Row, Col } from 'react-bootstrap';

import '@styles/CurrentSharePrice.css'

function CurrentSharePrice({ quote }) {
  return (
    <Container className='shadow-sm rounded mb-3 price-container'>
      <Table borderless>
        <tbody>
          <tr>
            <td className='price-title'>CURRENT SHARE PRICE</td>
            <td className='text-start'>$ {quote.currentPrice}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  )
}

export default CurrentSharePrice;