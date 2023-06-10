import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Home, Trade } from '@pages/index'

function App() {
  
  return (
    <Routes>
      <Route path="/login" element={<h1>Login</h1>} />
      <Route path="/" element={<Home />} />
      <Route path="/trade" element={<Trade />} />
    </Routes>
  )
}

export default App
