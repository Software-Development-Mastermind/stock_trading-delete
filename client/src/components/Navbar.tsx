import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import { AuthMethods, UserContext } from '@utils/index'
import '@styles/Navbar.css'

function NavbarComponent () {

  const auth = new AuthMethods()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useContext(UserContext)
  // const email = user.email
 
  const [activeLink, setActiveLink] = useState('')

  useEffect(() =>{
    setActiveLink(location.pathname)
  }, [location])

  useEffect(() => {
    if (!auth.loggedIn()) {navigate("/login")}
    }, []);

  const handleLogout = async (e: any) => {
      e.preventDefault();
      auth.logout()
      navigate('/login')
  }
    
    return (

      <Navbar className='navbar shadow-sm'>
        <Nav.Item className={`nav-item ${activeLink === '/' ? 'active' : ''}`}>
            <Nav.Link href='/'>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item className={`nav-item ${activeLink === '/portfolio' ? 'active' : ''}`}>
            <Nav.Link href='/portfolio'>Portfolio</Nav.Link>
        </Nav.Item>
        <Nav.Item className={`nav-item ${activeLink === '/trade' ? 'active' : ''}`}>
            <Nav.Link href='/trade'>Trade</Nav.Link>
        </Nav.Item>
        {auth.loggedIn() && (
        <Nav.Item className='nav-item logout-btn'>
          {/* <a onClick={handleLogout}>Logout [{email}]</a> */}
        </Nav.Item>
      )}
      </Navbar>

    )
}

export default NavbarComponent