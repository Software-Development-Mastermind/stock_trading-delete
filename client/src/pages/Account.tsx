import { useContext, useEffect, useState } from 'react'
import { Container, Button } from 'react-bootstrap'
import Axios from 'axios'

import { Navbar } from '@components/index'
import { UserContext } from '@utils/index'

function Account() {

  const user = useContext(UserContext)
  const [passwordLength, setPasswordLength] = useState(null)

  useEffect(() => {
    getPasswordLength()
  }, [])

  const getPasswordLength = async () => {
    const res = await Axios.get(`/api/get_user_password/${user.id}`);
    const passwordLength = res.data
    console.log(passwordLength)
    setPasswordLength(passwordLength)
  }

  const renderPasswordLength = () => {
    return '•'.repeat(passwordLength)
  }
  
  return (
    <>
      <Navbar />
      <Container>
        <Container className='shadow-sm mt-5'>
          <h3>Account</h3>
          <p>Email: {user.email} </p>
          <p>Password: {renderPasswordLength()}  </p>
        </Container>
        <Button>
          Change Email and Password
        </Button>
      </Container>
    </>
    )
}

export default Account