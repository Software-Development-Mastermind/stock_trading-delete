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
} from '@/utils/index'

import type { User } from '@/utils/index'

import { Container, Spinner } from 'react-bootstrap'
import { 
  Navbar, 
  PieChart, 
  PortfolioSummary, 
  PortfolioTable 
} from '@/components/index'


import '@styles/Portfolio.css'

function Portfolio () {

  interface Holding {
    name: string;
    symbol: string;
    shares: number;
    cost: number;
    currentValue: number;
  }

  interface HoldingDataWithPerformance extends Holding {
    currentValue: number;
    change: number;
    openPrice: number;
    openValue: number;
    changeValue: number;
    prevClose: number;
    prevCloseValue: number;
  }

  const user: User = useContext(UserContext)
  const userId: number = user.id
  
  const navigate = useNavigate()
  const auth = new AuthMethods()
  const company = new CompanyMethods()

  const [userCash, setUserCash] = useState<number>(0)
  const [userCashAsDollars, setUserCashAsDollars] = useState<string>('')
  const [holdings, setHoldings] = useState<HoldingDataWithPerformance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    if (!auth.loggedIn()) {
      navigate('/')
    } else {
      Promise.all([getUserPortfolio(userId), getUserCash(userId)])
      .then(() => {
        setIsLoading(false);
      })
    }
    }, []);

  const getUserPortfolio = async (userId: number) => {
    
    const res = await Axios.get(`/api/get_portfolio/${userId}`);
    const portfolioData = res.data;
    
      const holdingsWithPerformanceData: HoldingDataWithPerformance[]  = await Promise.all(
        portfolioData.map(async (holding: any) => {
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
    const cash: number = res.data.cash
    const formattedCash: string = formatDollarAmount(cash)
    setUserCash(cash)
    setUserCashAsDollars(formattedCash)
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
            userCashAsDollars={userCashAsDollars} 
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