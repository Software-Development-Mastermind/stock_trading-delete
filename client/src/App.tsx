import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Portfolio, Trade, Account } from '@/pages/index'
import { UserContext } from '@/utils/index'
import { withAuth } from '@/components/index'

function App() {
  
  return (

    <UserContext.Provider value={useContext(UserContext)}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default withAuth(App)


