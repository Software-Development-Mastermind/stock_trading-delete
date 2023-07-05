import { Modal, Button } from 'react-bootstrap'

function TradeModal({ show, hide }) {

  return (
    <Modal
      centered show={show}
      onHide={hide}
      backdrop='static'
      size='lg'
      >
      <Modal.Header closeButton>
        <Modal.Title>Trade</Modal.Title>
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