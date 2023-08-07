import { Container, Table } from 'react-bootstrap';
import { StockData } from '@/pages/Trade';

import '@styles/StockTable.css'

interface StockTableProps {
  stocks: StockData[];
  showModal: (stock: StockData) => void;
  userHasSearched: boolean;
}

function StockTable({ stocks, showModal, userHasSearched }: StockTableProps) {

  if (!stocks) return null

  const handleShowModal = (stock: StockData) => {
    showModal(stock);
  }

  const renderStockTable = () => {

    if (stocks.length === 0 && userHasSearched) {
      return (
        <tr>
          <td className='text-center no-results' colSpan={2}>
            Unable to locate any stocks matching that name or ticker symbol.
          </td>
        </tr>
      )
    }

    return stocks.map((stock, i) => {
      return (
        <tr key={i} onClick={() => handleShowModal(stock)}>
          <td className='ticker'>
            <span>
              {stock.symbol}
            </span>
          </td>
          <td className='stock-name'>
            <span>
              {stock.name || stock.description}
            </span>
          </td>
        </tr>
      )
    })
  }

  return(
      <Container className='stock-table-container'>
        <Table striped hover className='mt-4 shadow-sm'>
          <thead className='table-head text-center'>
            <tr className='text-center'>
              <th>Ticker</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {renderStockTable()}
          </tbody>
        </Table>
      </Container>
      
  );
}

export default StockTable;