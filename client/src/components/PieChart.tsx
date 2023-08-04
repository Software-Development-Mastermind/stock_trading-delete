import { Chart } from 'react-google-charts'
import { formatDollarAmount, removeCommas } from '@/utils/index'
import { useEffect, useState } from 'react'

import '@styles/PieChart.css'

interface Holding {
  name: string;
  symbol: string;
  shares: number;
  cost: number;
  currentValue: number;
}

interface PieChartProps {
  holdings: Holding[];
  userCash: number;
  userCashAsDollars: string;
}

interface TooltipObject {
  role: string;
  type: string;
}

function PieChart({ holdings, userCash, userCashAsDollars }: PieChartProps) {

  const title: {
    title: string;
  } = {
    title: "Portfolio by Asset Value"
  }

  const cashAsNumber = removeCommas(userCash);
  const userCashToolTip = `Cash: $ ${userCashAsDollars}`;

  const [data, setData] = useState<(string | number | {})[][]>([]);

  useEffect(() => {
    if (holdings) {
      const newData: (string | number | TooltipObject)[][] = [['Asset', 'Value', { role: 'tooltip', type: 'string'}]];
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
      setData([['Asset', 'Value'], ['Cash', cashAsNumber, userCashToolTip]])
    }
  }, []);
  
  return(
    <div className='mb-4 chart-container shadow-sm'>
      {/* @ts-ignore */}
      <Chart
        chartType="PieChart"
        data={data}
        options={title}
        width={'100%'}
        height={'400px'}
        >
      </Chart>
    </div>
  );
}

export default PieChart;