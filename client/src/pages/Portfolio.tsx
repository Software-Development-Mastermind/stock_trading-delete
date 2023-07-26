import Axios from 'axios'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext, AuthMethods, CompanyMethods, formatDollarAmount } from '@utils/index'

import Container from 'react-bootstrap/Container'
import { Navbar, PieChart, PortfolioSummary, PortfolioTable } from '@/components/index'

function Portfolio () {

  const user = useContext(UserContext)
  const userId = user.id

  const navigate = useNavigate()
  const auth = new AuthMethods()
  const company = new CompanyMethods()

  const [userCash, setUserCash] = useState(0)
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!auth.loggedIn()) {navigate("/login")}
    }, []);

  useEffect(() => {
    getUserPortfolio(userId)
    getUserCash(userId)
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

  const getUserCash = async (userId: number) => {
    const res = await Axios.get(`/api/get_cash/${userId}`)
    const formattedCash = formatDollarAmount(res.data.cash)
    console.log(`Get user cash: ${formattedCash}`)
    setUserCash(formattedCash)
  }

  return (
      <div>
        <Navbar />
        <Container className='mt-5'>
          <PieChart 
            holdings={holdings} 
            userCash={userCash} 
            isLoading={isLoading} />
          <PortfolioSummary 
            holdings={holdings} 
            userCash={userCash} 
            isLoading={isLoading} />
          <PortfolioTable 
            holdings={holdings} 
            isLoading={isLoading} />
        </Container>
      </div>
  )
}

export default Portfolio