import { useContext, useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import Axios from 'axios'

import { Navbar } from '@/components/index'
import { UserContext } from '@/utils/index'
import type { User } from '@/utils/index'

import '@styles/Account.css'

function Account() {

  const user: User = useContext(UserContext)
  const [passwordLength, setPasswordLength] = useState<number | null>(null)

  useEffect(() => {
    if (user.id) getPasswordLength()
  }, [])

  const getPasswordLength = async () => {
    const res = await Axios.get(`/api/get_user_password/${user.id}`);
    const passwordLength = res.data
    setPasswordLength(passwordLength)
  }

  const renderPasswordLength = () => {
    return '•'.repeat(passwordLength || 0)
  }
  
  return (
    <>
      <Navbar />
      <Container className='shadow-sm mt-5 account-container'>
        <Table borderless className='account-table'>
          <thead>
            <tr className='account-row'>
              <td className='account-title'>ACCOUNT DETAILS</td>
            </tr>
            <tr className='account-row'>
              <td className='content-header'>Email:</td>
              <td className='text-start'>{user.email}</td>
            </tr>
            <tr className='account-row'>
              <td className='content-header'>Password:</td>
              <td className='text-start'>{renderPasswordLength()}</td>
            </tr>
          </thead>
        </Table>
      </Container>
    </>
    )
}

export default Account