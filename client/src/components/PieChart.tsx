import { Chart } from 'react-google-charts'
import { formatDollarAmount } from '@utils/index'
import { useEffect, useState } from 'react'

function PieChart({ holdings, isLoading }) {

  useEffect(() => {
    console.log(holdings)
  }, [holdings])

  const title = {
    title: "Portfolio by Asset Value"
  }

  const [data, setData] = useState([])

  useEffect(() => {
    if (!isLoading && holdings) {
      const newData = [['Asset', 'Value']];
      holdings.forEach((holding) => {
        const { name, currentValue } = holding;
        newData.push([name, currentValue]);
      });
      setData(newData);
    }
  }, [holdings, isLoading]);

  return(
    <div className='mb-4'>
      <Chart
        className='shadow-sm'
        chartType="PieChart"
        data={data}
        options={title}
        width="100%"
        height="400px"
        >
      </Chart>
    </div>
  );
}

export default PieChart;