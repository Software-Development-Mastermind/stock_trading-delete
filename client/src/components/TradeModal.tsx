import { Modal, Button, Table, Form } from 'react-bootstrap'
import { StockData } from '@pages/Trade'
import { useEffect, useState } from 'react';
import { CompanyMethods } from '@utils/index'

interface TradeModalProps {
  show: boolean;
  hide: () => void;
  selectedStock: StockData;
}

interface QuoteData {
  "currentPrice": number;
  "change": number;
  "percentChange": number;
  "dailyHigh": number;
  "dailyLow": number;
  "openPrice": number;
  "previousClose": number;
}

interface FinancialData {
  "52WeekHigh": number;
  "52WeekHighDate": string;
  "52WeekLow": number; 
  "52WeekLowDate": string;
}

function TradeModal({ show, hide, selectedStock }: TradeModalProps): JSX.Element | null {

  if (!selectedStock) return null

  const company = new CompanyMethods()

  const [quote, setQuote] = useState<QuoteData>({
    "currentPrice" : 0,
    "change": 0,
    "percentChange": 0,
    "dailyHigh": 0,
    "dailyLow": 0,
    "openPrice": 0,
    "previousClose": 0
  })

  const [financials, setFinancials] = useState<FinancialData>({
    "52WeekHigh": 0,
    "52WeekHighDate": '',
    "52WeekLow": 0,
    "52WeekLowDate": ''
  })
  
  useEffect(() => {
    if (show && selectedStock) {
      const getStockData = async () => {

        const financialData = await company.getFinancials(selectedStock.symbol)
        setFinancials({
          "52WeekHigh": financialData["52WeekHigh"],
          "52WeekHighDate": financialData["52WeekHighDate"],
          "52WeekLow": financialData["52WeekLow"],
          "52WeekLowDate": financialData["52WeekLowDate"]
        })
        
        const quote = await company.getQuote(selectedStock.symbol)
        setQuote({
          "currentPrice" : quote.c,
          "change": quote.d,
          "percentChange": quote.dp,
          "dailyHigh": quote.h,
          "dailyLow": quote.l,
          "openPrice": quote.o,
          "previousClose": quote.pc
        })
        
      }
      getStockData()
    }
  }, [show, selectedStock])

  useEffect(() => {
    console.log('Updated quote:', quote);
  }, [quote]);

  useEffect(() => {
    console.log('Updated financials:', financials);
  }, [financials])

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
            <tr>
              <td>CURRENT SHARE PRICE:</td>
              <td>{quote.currentPrice != null ? `$${quote.currentPrice}` : 'Temporarily unavailable.'}</td>
            </tr>
            <p>TODAY</p>
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