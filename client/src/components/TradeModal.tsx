import { Modal, Button, Table, Form } from 'react-bootstrap'
import { StockData } from '@pages/Trade'
import { useEffect, useState } from 'react';
import { CompanyMethods } from '@utils/index'

interface TradeModalProps {
  show: boolean;
  hide: () => void;
  selectedStock: StockData;
}

interface PerformanceData {
  "name": string; // "name" or "description"
  "symbol": string; // "symbol"
  "currentPrice": number; // "c"
  "52WeekHigh": number;
  "52WeekHighDate": string;
  "52WeekLow": number;
  "52WeekLowDate": string;
}

function TradeModal({ show, hide, selectedStock }: TradeModalProps): JSX.Element | null {

  if (!selectedStock) return null

  const company = new CompanyMethods()

  const [performance, setPerformance] = useState<PerformanceData>({
    "name": '',
    "symbol": '',
    "currentPrice": 0,
    "52WeekHigh": 0,
    "52WeekHighDate": '',
    "52WeekLow": 0,
    "52WeekLowDate": ''
  })
  

  const [price, setPrice] = useState<number | null>(null)

  useEffect(() => {
    if (show && selectedStock) {
      const getStockData = async () => {
        const financialData = await company.getFinancials(selectedStock.symbol)
        setFinancials(financialData)
        const quote = await company.getQuote(selectedStock.symbol)
        setPrice(quote.c)
      }
      getStockData()
    }
  }, [show, selectedStock])

  return (
    <Modal
      centered show={show}
      onHide={hide}
      backdrop='static'
      size='lg'
      >
      <Modal.Header closeButton>
        <Modal.Title>{`${selectedStock.name || selectedStock.description} (${selectedStock.symbol})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Historical Price Chart will go HERE</p>
        <Table borderless>
          <tbody>
            <p>PERFORMANCE</p>
            <tr>
              <td>Current Share Price:</td>
              <td>{price != null ? `$${price}` : 'Temporarily unavailable.'}</td>
            </tr>
            <tr>
              <td>52 Week High:</td>
              <td>{price != null ? `$${price}` : 'Temporarily unavailable.'}</td>
            </tr>
            <p>TRADE</p>
            <tr>
              <td>Shares Owned:</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Cash Balance:</td>
              <td>$100,000</td>
            </tr>
            <tr>
              <td>Buying Power:</td>
              <td>50 shares</td>
            </tr>
          </tbody>
        </Table>
      <p>TRADE</p>
        <Form>
          <Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-secondary' onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TradeModal