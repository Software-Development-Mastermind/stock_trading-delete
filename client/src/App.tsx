import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Portfolio, Trade } from '@pages/index'

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
  )
}

export default App


