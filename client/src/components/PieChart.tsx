import { Chart } from 'react-google-charts'
import { formatDollarAmount, removeCommas } from '@utils/index'
import { useEffect, useState } from 'react'

function PieChart({ holdings, userCash, isLoading }) {

  const title = {
    title: "Portfolio by Asset Value"
  }

  const [data, setData] = useState([])

  useEffect(() => {
    if (!isLoading && holdings) {
      const newData = [['Asset', 'Value', { type: 'string', role: 'tooltip' }]];
      holdings.forEach((holding) => {
        const { name, currentValue } = holding;
        const formattedCurrentValue = formatDollarAmount(currentValue);
        const toolTip = `${name}: $ ${formattedCurrentValue}`;
        newData.push([name, currentValue, toolTip]);
      });

      const cashAsNumber = removeCommas(userCash);
      const formattedUserCash = formatDollarAmount(userCash);
      const userCashToolTip = `Cash: $ ${formattedUserCash}`;
      newData.push(['Cash', cashAsNumber, userCashToolTip]);

      setData(newData);
    }
  }, [holdings, userCash, isLoading]);

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