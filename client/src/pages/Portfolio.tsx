import Axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext, AuthMethods, formatDollarAmount, CompanyMethods, roundDown } from '@utils/index'

import Container from 'react-bootstrap/Container'
import { Navbar, PieChart, PortfolioTable } from '@/components/index'

function Portfolio () {

  const user = useContext(UserContext)
  const userId = user.id

  const navigate = useNavigate()
  const auth = new AuthMethods()
  const company = new CompanyMethods()

  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!auth.loggedIn()) {navigate("/login")}
    }, []);

  useEffect(() => {
    getUserPortfolio(userId)
    }, [])

  useEffect(() => {
    holdings.length !== 0 ? setIsLoading(false) : setIsLoading(true);
    }, [holdings]);
  

  const getUserPortfolio = async (userId: number) => {
    setIsLoading(true);
    
    const res = await Axios.get(`/api/get_portfolio/${userId}`);
    const portfolioData = res.data;

    const holdingsWithCurrentValue = await Promise.all(
      portfolioData.map(async (holding) => {
        const symbol = holding.symbol;
        const quote = await company.getQuote(symbol);
        const sharePrice = quote.c;
        const shares = holding.shares;
        const currentValue = sharePrice * shares;
  
        return { ...holding, currentValue };
      })
    );
    setHoldings(holdingsWithCurrentValue);
    setIsLoading(false);
  };

  return (
      <div>
        <Navbar />
        <Container>
          <h3>Portfolio</h3>
          <PieChart holdings={holdings} isLoading={isLoading} />
          <PortfolioTable holdings={holdings} isLoading={isLoading} />
        </Container>
      </div>
  )
}

export default Portfolio