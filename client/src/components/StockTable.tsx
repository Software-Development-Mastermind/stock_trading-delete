

function StockTable({ stocks }) {

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

  const renderTableData = () => {
    return stocks.map((stock, i) => {
      const { ticker, name } = stock
      return (
        <tr key={i}>
          <td>{ticker}</td>
          <td>{name}</td>
        </tr>
      )
    }))
  }

  return(
      <>
      </>
  );
}

export default StockTable;