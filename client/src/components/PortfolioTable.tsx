import Axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { Table } from 'react-bootstrap'
import { UserContext } from '@utils/index'


function PortfolioTable() {

  const user = useContext(UserContext)
  const userId = user.id
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    getUserPortfolio(userId)
  })

  const getUserPortfolio = async (userId: number) => {
    const portfolioRes = await Axios.get(`/api/get_portfolio/${userId}`)
    setHoldings([portfolioRes.data])
  }

  const renderPortfolioTable = () => {
    return holdings.map((holding: any, i) => {
      return (
        <tr key={i}>
          <td>{holding.symbol}</td>
          <td>{holding.shares}</td>
          <td>{holding.price}</td>
          <td>{holding.total}</td>
        </tr>
      )
    })
  }



  return (
    <Table>
      <thead>
        <tr>
          <th>Ticker</th>
          <th>Company</th>
          <th>Shares</th>
          <th>Cost</th>
          <th>Current Value</th>
          <th>Gain/Loss</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
      {renderPortfolioTable()}
    </Table>
  )
}

export default PortfolioTable