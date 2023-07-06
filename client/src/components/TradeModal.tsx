import Axios from 'axios'
import { Modal, Button, Table, Form } from 'react-bootstrap'
import { CompanyData } from '@pages/Trade'
import { useEffect, useState } from 'react';
import { CompanyMethods } from '@utils/index'

interface TradeModalProps {
  show: boolean;
  hide: () => void;
  company: CompanyData;
}

interface Financials {
  "52WeekHigh": number;
  "52WeekHighDate": string;
  "52WeekLow": number;
  "52WeekLowDate": string;
}

function TradeModal({ show, hide, company }: TradeModalProps): JSX.Element | null {

  if (!company) return null

  const [financials, setFinancials] = useState<Financials | null>(null)
  const [quote, setQuote] = useState<number | null>(null)

  useEffect(() => {
    if (show && company) {
      getCompanyFinancials(company.symbol)
      getStockQuote(company.symbol)
    }
  }, [show, company])






  // const getCompanyFinancials = async (symbol: string) => {
  //   try {
  //     const res = await Axios.get(`/api/stock_financials/${symbol}`)
  //     setFinancials(res.data)
  //     console.log(res.data)
  //   } catch {
  //     console.log('Error getting company financials')
  //   }
  // }

  // const getStockQuote = async (symbol: string) => {
  //   try {
  //     const res = await Axios.get(`/api/stock_quote/${symbol}`)
  //     const quoteData = res.data
  //     setQuote(quoteData.c)
  //     console.log(res.data)
  //   } catch {
  //     console.log('Error getting stock quote')
  //   }
  // }

  return (
    <Modal
      centered show={show}
      onHide={hide}
      backdrop='static'
      size='lg'
      >
      <Modal.Header closeButton>
        <Modal.Title>{`${company.name} (${company.symbol})`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Historical Price Chart will go HERE</p>
        <Table borderless>
          <tbody>
            <tr>
              <td>Current Share Price:</td>
              <td>{`$${quote}`}</td>
            </tr>
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