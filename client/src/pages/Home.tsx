import { useNavigate } from 'react-router-dom'

import { Container, Image, Button } from 'react-bootstrap'
import { Navbar } from '@/components/index'
import { AuthMethods } from '@/utils/index'
import '@styles/Home.css'
import stockMarketBull from '@assets/stockmarket.jpg'

function Home() {

  const navigate = useNavigate()
  const auth = new AuthMethods()

  const handleClick = (e: any) => {
    e.preventDefault()
    navigate('/login')
  }

  return (
    <>
      <Navbar />
      <Container className='home-container'>
        <Image src={stockMarketBull} alt='Stock Market Bull' className='bull-image shadow-sm' thumbnail></Image>
        <h2 className='title'>
          <span className='sim-span'>
            Sim
          </span>
          <span className='stocks-span'>
            Stocks
          </span>
        </h2>
        <p className='home-paragraph mt-4'>
          SimStocks is a stock trading simulator that allows you to practice stock trading using real stock market data without risking real money. 
          Experiment, take some risks, and explore what's possible!
        </p>
        <p className='home-paragraph'>
          You will start with $100,000 in cash that you can use to buy and sell stocks. 
          Visit the <span className='text-span'>Trade</span> page to search for stocks by company name or ticker and begin investing.
          The <span className='text-span'> Portfolio </span> page will show you how your investments are performing, and will allow you to buy and sell shares of the stocks you already own.
        </p>
        <p className='home-paragraph'>
          Good luck!
        </p>
        {!auth.loggedIn() &&
          <Button className='shadow-sm login-button' onClick={handleClick}>
            Sign In or Create an Account
          </Button>
        }
      </Container>
    </>
    )
}

export default Home