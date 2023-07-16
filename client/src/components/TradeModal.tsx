import { Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import { CompanyMethods } from '@utils/index'
import { 
  QuoteTable, 
  FinancialsTable, 
  TradeTable, 
  TradeForm 
} from '@components/index'

import type { StockData, QuoteData, FinancialData } from '@utils/index'


interface TradeModalProps {
  show: boolean;
  hide: () => void;
  selectedStock: StockData;
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

        <QuoteTable quote={ quote } />
        <FinancialsTable financials={ financials } />
        <TradeForm quote={ quote }selectedStock={ selectedStock } />

      </Modal.Body>

      <Modal.Footer>
        <Button className='btn btn-secondary shadow-sm' onClick={hide}>Close</Button>
      </Modal.Footer>

    </Modal>
  )
}

export default TradeModal