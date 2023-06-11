import { Button, Container, Form } from 'react-bootstrap'
import Navbar from '@components/Navbar'
import '@styles/Login.css'

function Login () {
    return (
      <>
        <Navbar />
        <Container className='content-container'>
          <Container className='login-box rounded shadow'>
            <h3 className='text-center'>Login</h3>
            <Form className='login-form'>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Enter email' />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' />
              </Form.Group>
              <Button variant='primary' type='submit'>
                Login
              </Button>
            </Form>
          </Container>
        </Container>
      </>
    )
}

export default Login