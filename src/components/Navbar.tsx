import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '@styles/Navbar.css'

function NavbarComponent () {
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
        </Navbar>
    )
}

export default NavbarComponent