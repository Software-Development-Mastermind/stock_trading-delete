import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthMethods } from '@utils/index'

import Navbar from '@components/Navbar'
import Container from 'react-bootstrap/Container'

function Portfolio () {

  const navigate = useNavigate()
  const auth = new AuthMethods()

  useEffect(() => {
    if (!auth.loggedIn()) {navigate("/login")}
    }, []);

  return (
      <div>
        <Navbar />
        <Container>
          <h3>This is the portfolio page.</h3>
        </Container>
      </div>
  )
}

export default Portfolio