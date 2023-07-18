import { Chart } from 'react-google-charts'

const title = {
  title: "Portfolio by Asset"
}

const data= [
  ['Stock', 'Shares'],
  ['AAPL', 10],
  ['TSLA', 5],
  ['AMZN', 2],
  ['GOOG', 1],
  ['FB', 1],
  ['MSFT', 1],
  ['NVDA', 1]
]

function PortfolioCharts() {
  return(
      <Chart
        chartType="PieChart"
        data={data}
        options={title}
        width="100%"
        height="400px"
        >
      </Chart>
  );
}

export default PortfolioCharts;