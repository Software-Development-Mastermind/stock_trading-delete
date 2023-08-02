import Axios from 'axios'
import { 
  useState, 
  useEffect, 
  useContext 
} from 'react'
import { useNavigate } from 'react-router-dom'

import { 
  UserContext, 
  AuthMethods, 
  CompanyMethods, 
  formatDollarAmount 
} from '@utils/index'

import { Container, Spinner } from 'react-bootstrap'
import { 
  Navbar, 
  PieChart, 
  PortfolioSummary, 
  PortfolioTable 
} from '@/components/index'

import '@styles/Portfolio.css'

function Portfolio () {

  const user = useContext(UserContext)
  const userId = user.id

  const navigate = useNavigate()
  const auth = new AuthMethods()
  const company = new CompanyMethods()

  const [userCash, setUserCash] = useState(0)
  const [holdings, setHoldings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!auth.loggedIn()) {navigate('/')}
    }, []);

  useEffect(() => {
    Promise.all([getUserPortfolio(userId), getUserCash(userId)])
      .then(() => {
        setIsLoading(false);
      })
    }, []);

  const getUserPortfolio = async (userId: number) => {
    
    const res = await Axios.get(`/api/get_portfolio/${userId}`);
    const portfolioData = res.data;
    
      const holdingsWithPerformanceData = await Promise.all(
        portfolioData.map(async (holding) => {
          const symbol = holding.symbol;
          const quote = await company.getQuote(symbol);
          const shares = holding.shares;
          const sharePrice = quote.c;
          const openPrice = quote.o;
          const openValue = openPrice * shares;
          const prevClose = quote.pc;
          const prevCloseValue = prevClose * shares;
          const change = quote.d;
          const changeValue = change * shares;
          const currentValue = sharePrice * shares;
  
          return { 
            ...holding, 
            currentValue, 
            change, 
            openPrice, 
            openValue, 
            changeValue, 
            prevClose, 
            prevCloseValue 
          };
          
        })
      );
      setHoldings(holdingsWithPerformanceData);
  };

  const getUserCash = async (userId: number) => {
    const res = await Axios.get(`/api/get_cash/${userId}`)
    const formattedCash = formatDollarAmount(res.data.cash)
    setUserCash(formattedCash)
  }

  return (
    <>
    <Navbar />
    <Container className='mt-5'>
      {isLoading ? (
        <div className='d-flex align-items-center loading-container'>
          <Spinner animation='border' className='spinner' />
          <h3>Loading portfolio...</h3>
        </div>
      ) : (
        <>
          <PieChart 
            holdings={holdings} 
            userCash={userCash} 
            />
          <PortfolioSummary 
            holdings={holdings} 
            userCash={userCash} 
            />
          <PortfolioTable
            holdings={holdings}
            getUserPortfolio={getUserPortfolio}
            userId={userId}
          />
        </>
      )}
    </Container>
  </>
  )
}

export default Portfolio