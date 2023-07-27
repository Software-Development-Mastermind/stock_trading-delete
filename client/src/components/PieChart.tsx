import { Chart } from 'react-google-charts'
import { formatDollarAmount, removeCommas } from '@utils/index'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    console.log(`holdings are: ${holdings.length}`)
  }, [holdings])

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