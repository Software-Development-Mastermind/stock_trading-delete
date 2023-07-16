import { formatDate } from '@utils/index'
import type { FinancialData } from '@utils/index'

import { Table } from 'react-bootstrap';

function FinancialsTable({financials}: FinancialData) {
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