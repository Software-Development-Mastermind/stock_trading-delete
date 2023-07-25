import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Chart } from 'react-google-charts';

import { formatDate, getTimestampForOneYearAgo, getTimestampForToday } from '@utils/index'

function PerformanceChart({ selectedStock }: any) {

  const [candlesData, setCandlesData] = useState<any>([])
  const [chartData, setChartData] = useState([
    ['Month', 'Price Low', 'Opening Price', 'Final Closing Price', 'Price High'],
  ]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0 indexed
  const currentYear = currentDate.getFullYear();

  const monthNames = [];

  for (let i = 0; i < 12; i++) {
    const month = (currentMonth - i + 12) % 12;
    const year = currentYear - Math.floor((currentMonth - i) / 12);
    monthNames.push(`${year}-${month + 1}`);
  }

  useEffect(() => {
    if (candlesData.length !== 0) {
      console.log('Looping through candles data');
      const newChartData = [
        ['Month', 'Price Low', 'Opening Price', 'Final Closing Price', 'Price High', { role: 'tooltip', type: 'string', p: { html: true } }],
      ];
      const timestamp = candlesData.t
      console.log(timestamp);
    
      for (let i = 0; i < timestamp.length; i++) {
        const month = monthNames[i];
        const priceLow = candlesData.l[i];
        const openingPrice = candlesData.o[i];
        const closingPrice = candlesData.c[i];
        const priceHigh = candlesData.h[i];

        const toolTipContent = 
           `Month: ${month}

            Highest Price: ${priceHigh}
            Lowest Price: ${priceLow}

            Opening Price: ${openingPrice}
            Closing Price: ${closingPrice}`
        
        newChartData.push([month, priceLow, openingPrice, closingPrice, priceHigh, toolTipContent]);
      }
  
      console.log('New chart data:', newChartData);
      setChartData(newChartData);
    }
  }, [candlesData]);

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

  useEffect(() => {
    console.log(`Candles data: ${candlesData["c"]}`)
  }, [candlesData])

  return (
    <Chart
      width={'100%'}
      height={'350px'}
      chartType="CandlestickChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        legend: 'none',
        candlestick: {
          fallingColor: { strokeWidth: 0, fill: '#a52714' },
          risingColor: { strokeWidth: 0, fill: '#0f9d58' },
        },
      }}
      tooltip={{isHtml: true }}
    />
  );
    };

export default PerformanceChart;
