import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Holdings, Trade } from '@pages/index'

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/holdings" element={<Holdings />} />
      <Route path="/trade" element={<Trade />} />
    </Routes>
  )
}

export default App
