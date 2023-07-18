import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { AuthMethods } from '@utils/index'

import Container from 'react-bootstrap/Container'
import { Navbar, PerformanceChart, PieChart, PortfolioTable } from '@/components/index'

function Portfolio () {

  const navigate = useNavigate()
  const auth = new AuthMethods()
  
  useEffect(() => {
    if (!auth.loggedIn()) {navigate("/login")}
    }, []);

  return (
      <div>
        <Navbar />
        <Container>
          <h3>Portfolio</h3>
          <PieChart/>
          <PerformanceChart />
          <PortfolioTable />
        </Container>
      </div>
  )
}

export default Portfolio