import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Portfolio, Trade } from '@pages/index'
import { UserContext } from '@utils/index'

function App() {
  
  return (

    <UserContext.Provider value={useContext(UserContext)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App


