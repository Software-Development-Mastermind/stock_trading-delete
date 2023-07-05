import { Modal, Button } from 'react-bootstrap'
import { Company } from '@/pages/Trade'

interface TradeModalProps {
  show: boolean;
  hide: () => void;
  company: Company;
}

function TradeModal({ show, hide, company }: TradeModalProps): JSX.Element | null {

  if (!company) return null

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
        <p>Trade</p>
      </Modal.Body>
      <Modal.Footer>
        <Button className='btn btn-secondary' onClick={hide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TradeModal