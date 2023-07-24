import { useState, useEffect } from 'react'
import Axios from 'axios'

import { Table } from 'react-bootstrap';

import { formatDate, getTimestampForOneYearAgo, getTimestampForToday } from '@utils/index'
import type { FinancialData } from '@utils/index'


function FinancialsTable({selectedStock, financials}: FinancialData) {

  const [candlesData, setCandlesData] = useState<any>([])

  const symbol = selectedStock.symbol

  const getCandlesFromPastYear = async (symbol: string) => {
    const year = getTimestampForOneYearAgo()
    const today = getTimestampForToday()
    const res = await Axios.get(`api/candles/<${symbol}>/M/<${year}>/<${today}>`)
    setCandlesData(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    getCandlesFromPastYear(symbol)
  }, [])

  useEffect(() => {
    console.log(candlesData)
  }, [candlesData])
  
  useEffect(() => {
    console.log(selectedStock)
  }, [])

  return(
    <>
      <p>HISTORIC PERFORMANCE</p> 
      <Table borderless size='sm'>             
        <tbody>
          <tr>
            <td>52 Week High - {formatDate(financials["52WeekHighDate"])}:</td>
            <td className='text-start'>{financials["52WeekHigh"] != null ? `$ ${financials["52WeekHigh"]}` : 'Temporarily unavailable.'}</td>
          </tr>
          <tr>
            <td>52 Week Low - {formatDate(financials["52WeekLowDate"])}:</td>
            <td className='text-start'>{financials["52WeekLow"] != null ? `$ ${financials["52WeekLow"]}` : 'Temporarily unavailable.'}</td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default FinancialsTable;