import { useState, useEffect } from 'react'
import { Chart } from 'react-google-charts';

function PerformanceChart({ selectedStock }: any) {

  const [candlesData, setCandlesData] = useState<any>([])

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 indexed
  const currentYear = currentDate.getFullYear();

  const monthNames = [];

  for (let i = 0; i < 12; i++) {
    const month = (currentMonth - i + 12) % 12;
    const year = currentYear - Math.floor((currentMonth - i) / 12);
    monthNames.push(`${year}-${month + 1}`);
  }

  const data = [
    ['Month', 'Price Low', 'Opening Price', 'Final Closing Price', 'Price High'],
    [monthNames[0], 265.25, 272.21639999999996, 297.1497, 298.3197],
  ];

  const symbol = selectedStock.symbol

  const getCandlesFromPastYear = async (symbol: string) => {
    const year = getTimestampForOneYearAgo()
    const today = getTimestampForToday()
    const res = await Axios.get(`api/candles/${symbol}`, {
      params: {
        "resolution": "M",
        "from_date": year,
        "to_date": today
      }
    })
    setCandlesData(res.data)
    console.log(res.data)
  }

  useEffect(() => {
    getCandlesFromPastYear(symbol)
  }, [])

  return (
    <Chart
      width={'100%'}
      height={'400px'}
      chartType="CandlestickChart"
      loader={<div>Loading Chart</div>}
      data={data}
      options={{
        legend: 'none',
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: '#a52714' },
          risingColor: { strokeWidth: 0, fill: '#0f9d58' },
        },
      }}
      rootProps={{ 'data-testid': '1' }}
    />
  );
    };

export default PerformanceChart;
