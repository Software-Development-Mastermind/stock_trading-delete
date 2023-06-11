import { Button, Container, Form, FloatingLabel } from 'react-bootstrap'
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
                <FloatingLabel 
                  className='md-3' 
                  label='Email address' 
                  controlId='floatingInput'
                  >
                <Form.Control type='email' placeholder='Enter email' />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
              <FloatingLabel 
                  className='md-3' 
                  label='Password'
                  controlId='floatingInput'
                  >
                <Form.Control type='password' placeholder='Enter password' />
                </FloatingLabel>
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