import { Chart } from 'react-google-charts'
import { formatDollarAmount, removeCommas } from '@utils/index'
import { useEffect, useState } from 'react'

import '@styles/PieChart.css'

function PieChart({ holdings, userCash }) {

  const title = {
    title: "Portfolio by Asset Value"
  }

  const cashAsNumber = removeCommas(userCash);
  const formattedUserCash = formatDollarAmount(userCash);
  const userCashToolTip = `Cash: $ ${formattedUserCash}`;

  const [data, setData] = useState([])

  useEffect(() => {
    if (holdings) {
      const newData = [['Asset', 'Value', { type: 'string', role: 'tooltip' }]];
      holdings.forEach((holding) => {
        const { name, currentValue } = holding;
        const formattedCurrentValue = formatDollarAmount(currentValue);
        const toolTip = `${name}: $ ${formattedCurrentValue}`;
        newData.push([name, currentValue, toolTip]);
      });

      newData.push(['Cash', cashAsNumber, userCashToolTip]);

      setData(newData);
    }
  }, [holdings]);

  useEffect(() => {
    if (!holdings) {
      setData([['Asset', 'Value', { type: 'string', role: 'tooltip' }], ['Cash', cashAsNumber, userCashToolTip]])
    }
  }, []);

  return(
    <div className='mb-4 chart-container shadow-sm'>
      <Chart
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