import { useState } from 'react';
import { Form, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';


function TradeForm({ selectedStock }: any) {

  const [checked, setChecked] = useState('buy')

  const handleToggleButtonChange = (value: string) => {
    setChecked(value);
  }

  return(
    <Form>
      <ButtonGroup>
        <ToggleButton
          className='shadow-sm'
          id='buy-button'
          type='checkbox'
          variant='outline-primary'
          value='buy'
          checked = {checked === "buy"}
          onClick={() => {handleToggleButtonChange('buy')}}
        >
          Buy
        </ToggleButton>
        <ToggleButton
          className='shadow-sm'
          id='sell-button'
          type='checkbox'
          variant='outline-primary'
          value='sell'
          checked = {checked === "sell"}
          onClick={() => {handleToggleButtonChange('sell')}}
        >
          Sell
        </ToggleButton>
      </ButtonGroup>
      <Form.Group>
        <Form.Label>{checked === 'sell' ? 'Shares to sell:' : 'Shares to buy:'}</Form.Label>
        <Form.Control 
          className='shadow-sm' 
          type='number' 
          placeholder='0' 
          />
        <p className ='mt-3'>{checked === 'sell' ? 'Total sale value:' : 'Total cost:'}</p>
        <Button className='shadow-sm'>
          {checked === 'sell' ? 'Complete sale' : 'Complete purchase'}
        </Button>
      </Form.Group>
      
    </Form>
  )
}

export default TradeForm;