import { Container, Table } from 'react-bootstrap';


import '@styles/StockTable.css'

function StockTable({ companies }) {


  const renderCompanyTable = () => {
    return companies.map((company, i) => {
      return (
        <tr key={i}>
          <td>{company.symbol}</td>
          <td>{company.name}</td>
          <td>
            <button className='btn btn-primary btn-sm'>Trade</button>
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
              <th>Trade</th>
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