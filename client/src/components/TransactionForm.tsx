import { useState } from 'react';
import { Form, ButtonGroup, ToggleButton } from 'react-bootstrap';


function TransactionForm() {

  const [checked, setChecked] = useState('buy')

  const handleToggleButtonChange = (value: string) => {
    setChecked(value);
  }

  return(
    <Form>
      <ButtonGroup>
        <ToggleButton
          id='buy'
          type='checkbox'
          variant='outline-primary'
          value='buy'
          checked = {checked === "buy"}
          onChange={() => {handleToggleButtonChange('buy')}}
        >
          Buy
        </ToggleButton>
        <ToggleButton
          id='buy'
          type='checkbox'
          variant='outline-primary'
          value='sell'
          checked = {checked === "sell"}
          onChange={() => {handleToggleButtonChange('sell')}}
        >
          Sell
        </ToggleButton>
      </ButtonGroup>
      <Form.Group>
      </Form.Group>
    </Form>
  )
}

export default TransactionForm;