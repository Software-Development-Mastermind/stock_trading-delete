import { Container } from 'react-bootstrap';


import '@styles/StockTable.css'

function StockTable({ companies }) {


  const renderCompanyTable = () => {
    return companies.map((company: any, i: number) => {
      return (
        <tr key={i}>
          <td>{company.symbol}</td>
          <td>{company.name}</td>
        </tr>
      )
    })
  }

  return(
      <Container className='stock-table-container'>
        <table className='mt-4 table table-striped shadow'>
          <thead className='table-head'>
            <tr>
              <th>Ticker</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {renderCompanyTable()}
          </tbody>
        </table>

      </Container>
      
  );
}

export default StockTable;