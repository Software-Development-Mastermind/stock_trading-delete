import { Button, Container, Form, FloatingLabel } from 'react-bootstrap'
import Navbar from '@components/Navbar'
import '@styles/Login.css'

function Login () {
    return (
      <>
        <Navbar />
        <Container className='content-container'>
          <Container className='login-box rounded shadow'>
            <h3 className='text-center mt-3 mb-3'>Login</h3>
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
              <Container className='text-center'>
                <Button className='mt-1' variant='primary' type='submit'>
                  Login
                </Button>
              </Container>
            </Form>
          </Container>
        </Container>
      </>
    )
}

export default Login