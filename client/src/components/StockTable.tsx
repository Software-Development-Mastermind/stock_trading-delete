import { Container, Table } from 'react-bootstrap';
import { Company } from '@/pages/Trade';

import '@styles/StockTable.css'

interface StockTableProps {
  companies: Company[];
  showModal: (company: Company) => void;
}

function StockTable({ companies, showModal }: StockTableProps) {

  const handleShowModal = (company: Company) => {
    showModal(company);
  }

  const renderCompanyTable = () => {
    return companies.map((company, i) => {
      return (
        <tr key={i} onClick={() => handleShowModal(company)}>
          <td className='ticker'>
            <span>
              {company.symbol}
            </span>
          </td>
          <td className='stock-name'>
            <span>
              {company.name || company.description}
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
            {renderCompanyTable()}
          </tbody>
        </Table>
      </Container>
      
  );
}

export default StockTable;