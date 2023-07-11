import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Portfolio, Trade } from '@pages/index'
import { UserContext } from '@utils/index'

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    if (user) {
    console.log(`User id at the App level: ${user.id}`)
    }
  }, [user])
  
  return (
    <UserContext.Provider value={user}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App
