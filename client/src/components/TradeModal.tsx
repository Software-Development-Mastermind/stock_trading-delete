import { Modal, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';

import { CompanyMethods, roundDown } from '@/utils/index'
import { 
  QuoteTable, 
  PerformanceChart,  
  TradeForm 
} from '@/components/index'

import type { 
  StockData, 
  QuoteData, 
  FinancialData 
} from '@/utils/index'

import '@styles/TradeModal.css'


interface TradeModalProps {
  show: boolean;
  hide: () => void;
  selectedStock: StockData | null;
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

  const [shownPerformance, setShownPerformance] = useState<string>('today')
  
  useEffect(() => {
    if (show && selectedStock) {
      const getStockData = async () => {

        const financialData = await company.getFinancials(selectedStock.symbol)
        setFinancials({
          "52WeekHigh": roundDown(financialData["52WeekHigh"]),
          "52WeekHighDate": financialData["52WeekHighDate"],
          "52WeekLow": roundDown(financialData["52WeekLow"]),
          "52WeekLowDate": financialData["52WeekLowDate"]
        })

        const quote = await company.getQuote(selectedStock.symbol)
        setQuote({
          "currentPrice" : roundDown(quote.c),
          "change": roundDown(quote.d),
          "percentChange": roundDown(quote.dp),
          "dailyHigh": roundDown(quote.h),
          "dailyLow": roundDown(quote.l),
          "openPrice": roundDown(quote.o),
          "previousClose": roundDown(quote.pc)
        })
        
      }
      getStockData()
    }
  }, [show, selectedStock])

  const handlePerformanceToggle = () => {
    if (shownPerformance === 'today') {
      setShownPerformance('historic')
    } else {
      setShownPerformance('today')
    }
  }

  return (
    <Modal
      centered show={show}
      onHide={hide}
      backdrop='static'
      size='lg'
      >

      <Modal.Header closeButton className='modal-header'>
        <Modal.Title>
          {`${selectedStock.name || selectedStock.description} (${selectedStock.symbol})`}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        
        {shownPerformance === 'today' ? (
          <QuoteTable quote={ quote } />
        ) : (
          <PerformanceChart financials={financials } selectedStock={selectedStock} />
        )}

        <TradeForm quote={ quote } selectedStock={ selectedStock } />

      </Modal.Body>

      <Modal.Footer className='modal-footer'>
        <div className='me-auto'>
          <Button className='btn shadow-sm' variant='outline-secondary' onClick={handlePerformanceToggle}>
            {shownPerformance === 'today' 
            ? "Show Historic Performance" 
            : "Show Today's Performance"}
          </Button>
        </div>
          <Button 
            className='btn shadow-sm' 
            variant='outline-secondary' 
            onClick={hide}>
              Close
          </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default TradeModal