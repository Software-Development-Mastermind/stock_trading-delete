import { Container } from 'react-bootstrap';

import '@styles/StockTable.css'

function StockTable() {

  const stocks : {
    ticker: string;
    name: string;
  } [] = [];

  interface TableRowProps {
    ticker: string;
    name: string;
  }

  const TableRow = ({ ticker, name }: TableRowProps) => {
    return (
      <tr>
        <td>{ticker}</td>
        <td>{name}</td>
      </tr>
    );
  }

  // const renderTableData = () => {
  //   return (
  //     <tr key={i}>
  //       <td>{ticker}</td>
  //       <td>{name}</td>
  //     </tr>
  //   )
  //   })
  // }

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
            {/* {renderTableData()} */}
          </tbody>
        </table>

      </Container>
      
  );
}

export default StockTable;