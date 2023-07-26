import { useState, useEffect } from 'react'
import Axios from 'axios'
import { Container, Table } from 'react-bootstrap';
import { Chart } from 'react-google-charts';

import { formatDate, getMonthName, roundDown, getTimestampForOneYearAgo, getTimestampForToday } from '@utils/index'

import '@styles/PerformanceChart.css'

function PerformanceChart({ financials, selectedStock }: any) {

  const [candlesData, setCandlesData] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [chartData, setChartData] = useState([
    ['Month', 'Price Low', 'Opening Price', 'Final Closing Price', 'Price High'],
  ]);

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const dates: [] = [];

  for (let i = 11; i >= 0; i--) {
    const month = (currentMonth - i + 11) % 12;
    const year = currentMonth - month >= 0 ? currentYear : currentYear - 1;
    dates.push(`${(getMonthName(month))}, ${year}`);
  }

  useEffect(() => {
    if (candlesData.length !== 0) {
      console.log('Looping through candles data');
      const newChartData = [
        ['Month', 'Price Low', 'Opening Price', 'Final Closing Price', 'Price High', { role: 'tooltip', type: 'string', p: { html: true } }],
      ];
      const timestamp = candlesData.t
      console.log(timestamp);
    
      for (let i = 0; i < timestamp.length -1; i++) {
        const date = dates[i];
        const priceLow = candlesData.l[i];
        const openingPrice = candlesData.o[i];
        const closingPrice = candlesData.c[i];
        const priceHigh = candlesData.h[i];

        const toolTipContent = 
           `${date}

            Highest Price: $ ${roundDown(priceHigh)}
            Lowest Price: $ ${roundDown(priceLow)}

            Opening Price: $ ${roundDown(openingPrice)}
            Closing Price: $ ${roundDown(closingPrice)}`
        
        newChartData.push([date, priceLow, openingPrice, closingPrice, priceHigh, toolTipContent]);
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
    const candles = res.data
    setCandlesData(candles)
    setIsLoading(false)
    console.log(res.data)
  }

  useEffect(() => {
    getCandlesFromPastYear(symbol)
  }, [])

  useEffect(() => {
    console.log(`Candles data: ${candlesData["c"]}`)
  }, [candlesData])

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className='shadow-sm rounded mb-1 performance-container'>
      <p className='chart-title'>HISTORIC PERFORMANCE</p>
      <Chart
        width={'100%'}
        height={'350px'}
        chartType="CandlestickChart"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          legend: 'none',
          candlestick: {
            fallingColor: { strokeWidth: 0, fill: '#a52714' },
            risingColor: { strokeWidth: 0, fill: '#0f9d58' },
          },
          vAxis: {
            title: 'Share Price (USD)',
            format: 'currency'
          },
          hAxis: {
            title: 'Month'
          },
          chartArea: { 
            width: '70%', 
            height: '60%',
            bottom: '35%', 
          },
        }}
        tooltip={{isHtml: true }}
      />
      <Table borderless size='sm'>             
        <tbody>
          <tr>
            <td className='left-column'>52 Week High - {formatDate(financials["52WeekHighDate"])}:</td>
            <td className='text-start'>{financials["52WeekHigh"] != null ? `$ ${financials["52WeekHigh"]}` : 'Temporarily unavailable.'}</td>
          </tr>
          <tr>
            <td>52 Week Low - {formatDate(financials["52WeekLowDate"])}:</td>
            <td className='text-start'>{financials["52WeekLow"] != null ? `$ ${financials["52WeekLow"]}` : 'Temporarily unavailable.'}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
    };

export default PerformanceChart;
