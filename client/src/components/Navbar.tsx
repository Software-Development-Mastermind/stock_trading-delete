import { useNavigate } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import AuthMethods from '@utils/index'
import '@styles/Navbar.css'

function NavbarComponent () {

  const auth = new AuthMethods()
  const navigate = useNavigate()

  const handleLogout = async (e: any) => {
      e.preventDefault();
      auth.logout()
      navigate('/login')
  }
    
    return (

      <Navbar className='navbar shadow'>
        <Nav.Item className='nav-item'>
            <Nav.Link href='/'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav-item'>
            <Nav.Link href='/holdings'>Holdings</Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav-item'>
            <Nav.Link href='/trade'>Trade</Nav.Link>
        </Nav.Item>
        <Nav.Item className='nav-item logout-btn'>
            <a onClick={handleLogout}> 
                Logout
            </a>
        </Nav.Item>
      </Navbar>

    )
}

export default NavbarComponent