import { useState } from 'react';
import { Row, Col, Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';

import '@styles/TradeForm.css'


function TradeForm({ selectedStock }: any) {

  const [checked, setChecked] = useState('buy')
  const [shares, setShares] = useState(0)

  const handleToggleButtonChange = (value: string) => {
    setChecked(value);
  }

  const handleSharesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShares(Number(e.target.value));
  }

  return (
    <div className='trade-form-container shadow-sm'>
      <Form>
        <Row>
          <Col xs={12} sm={2}>
            <ButtonGroup className="mb-3">
              <ToggleButton
                className="shadow-sm"
                id="buy-button"
                type="checkbox"
                variant="outline-primary"
                value="buy"
                checked={checked === 'buy'}
                onClick={() => {
                  handleToggleButtonChange('buy');
                }}
              >
                Buy
              </ToggleButton>
              <ToggleButton
                className="shadow-sm"
                id="sell-button"
                type="checkbox"
                variant="outline-primary"
                value="sell"
                checked={checked === 'sell'}
                onClick={() => {
                  handleToggleButtonChange('sell');
                }}
              >
                Sell
              </ToggleButton>
            </ButtonGroup>
          </Col>
          <Col xs={2} sm={2}>
            <Form.Group className="mb-3">
              <Form.Control 
                className="shadow-sm" 
                type="number" 
                placeholder="0"
                value={shares}
                onChange = {handleSharesChange}
                />
            </Form.Group>
          </Col>
          <Col xs={8} sm={5} className='d-flex align-items-center'>
            <p className='shares-identifier'>
              shares of {selectedStock.name} ({selectedStock.symbol})
            </p>
          </Col>
          </Row>
            <p className='mt-1'>{checked === 'sell' ? 'Total sale value:' : 'Total cost:'}</p>
            <p className='mt-1'>{checked === 'sell' ? 'Cash balance after sale:' : 'Cash balance after purchase:'}</p>
          <Col xs={12}>
            <Button className="shadow-sm">{checked === 'sell' ? 'Complete sale' : 'Complete purchase'}</Button>
          </Col>
      </Form>
    </div>
  );
}

export default TradeForm;