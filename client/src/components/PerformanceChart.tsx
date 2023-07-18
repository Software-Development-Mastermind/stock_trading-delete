import { Chart } from 'react-google-charts'

const options = {
  title: "Performance",
  curveType: "function",
  legend: { position: "bottom" }
}

const data = [
  ['Date', 'Value'],
  ['1/1/2021', 100000],
  ['1/2/2021', 89000],
  ['1/3/2021', 111000],
  ['1/4/2021', 109000],
  ['1/5/2021', 100000],
  ['1/6/2021', 122000],
  ['1/7/2021', 110600]
]

function PerformanceChart() {
  return(
      <Chart
        chartType="LineChart"
        data={data}
        options={options}
        width="100%"
        height="400px"
        >
      </Chart>
  );
}

export default PerformanceChart;