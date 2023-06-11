import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function NavbarComponent () {
    return (
        <Navbar className='shadow'>
            <Nav.Item>
                <Nav.Link href='/'>Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/holdings'>Holdings</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href='/trade'>Trade</Nav.Link>
            </Nav.Item>
        </Navbar>
    )
}

export default NavbarComponent