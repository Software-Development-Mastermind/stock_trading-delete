import { Container, Image, Button } from 'react-bootstrap'
import { Navbar } from '@components/index'
import '@styles/Home.css'

function Home() {
  return (
    <>
      <Navbar />
      <Container className='home-container'>
        <Image src='src/assets/stockmarket.jpg' alt='Stock Market Bull' className='bull-image shadow-sm' thumbnail></Image>
        <h2>
          SimStocks
        </h2>
        <p className='home-paragraph mt-4'>
          SimStocks is a stock trading simulator that allows you to practice stock trading using real stock market data without risking real money. 
          Experiment, take some risks, and explore what's possible.
        </p>
        <p className='home-paragraph'>
          You will start with $100,000 in cash that you can use to buy and sell stocks. 
          Visit the <span className='text-span'>Trade</span> page to search for stocks by company name or ticker and begin investing.
          The <span className='text-span'> Portfolio </span> page will show you how your investments are performing, and will allow you to buy and sell shares in the stocks you already own.
        </p>
        <p>
          Good luck!
        </p>
        <Button className='shadow-sm login-button'>
          Sign In or Create an Account to Get Started
        </Button>
      </Container>
    </>
    )
}

export default Home