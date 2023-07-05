import { Container, Table } from 'react-bootstrap';

import '@styles/StockTable.css'

function StockTable({ companies, showModal }) {

  const handleShowModal = () => showModal();

  const renderCompanyTable = () => {
    return companies.map((company, i) => {
      return (
        <tr key={i} onClick={handleShowModal}>
          <td className='ticker'>
            <span>
              {company.symbol}
            </span>
          </td>
          <td className='stock-name'>
            <span>
              {company.name}
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
            <tr className-='text-center'>
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