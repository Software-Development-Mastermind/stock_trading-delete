import Axios from 'axios'
import { Modal, Button, Table, Form } from 'react-bootstrap'
import { Company } from '@/pages/Trade'

interface TradeModalProps {
  show: boolean;
  hide: () => void;
  company: Company;
}

function TradeModal({ show, hide, company }: TradeModalProps): JSX.Element | null {

  if (!company) return null

  getCompanyFinancials = async (company.symbol) => {
    const res = await Axios.get(`/api/stock_financials/${company.symbol}`)
    console.log(res)
  }

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
              <td>Current Price:</td>
              <td>$0</td>
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