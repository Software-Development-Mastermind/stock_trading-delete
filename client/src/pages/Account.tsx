import { useContext } from 'react'
import { Container } from 'react-bootstrap'
import Axios from 'axios'

import { Navbar } from '@components/index'
import { UserContext } from '@utils/index'

function Account() {

  const user = useContext(UserContext)

  const getUserPassword = async (userId: number) => {
    const res = await Axios.get(`/api/get_user_password/${userId}`);
    const userData = res.data;
    return userData
  }

  return (
    <>
      <Navbar />
      <Container className='shadow-sm mt-5'>
        <h3>Account</h3>
        <p>Email: {user.email} </p>
        <p>Id: {user.id}</p>
        {/* <p>Password: {getUserPassword(user.id)} </p> */}
      </Container>
    </>
    )
}

export default Account