import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Portfolio, Trade } from '@pages/index'
import { AuthContext } from '@utils/index'

function App() {

  const [user, setUser] = useState(null)
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
