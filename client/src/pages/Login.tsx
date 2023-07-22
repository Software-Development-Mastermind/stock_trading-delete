import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, Form, FloatingLabel } from 'react-bootstrap'

import Navbar from '@components/Navbar'
import { AuthMethods, getUserId } from '@utils/index'
import '@styles/Login.css'

function Login () {

  const auth = new AuthMethods()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (auth.loggedIn()) {
      navigate('/')
    }
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const login = await auth.login(email, password)
      console.log(login)
      if (login) {
        auth.setCurrentUser({
          "email": email,
          "id": await getUserId(email)
        })
        navigate('/')
      } else {
        setEmail('')
        setPassword('')
      }
    } catch (err) {
      console.log(`Login failed: ${err}`)
    }
  }
 
  return (
    <>
      <Navbar />
      <Container className='content-container'>
        <Container className='login-box rounded shadow-sm'>
          <h3 className='login-header text-center mt-3 mb-3'>Welcome back.</h3>
          <Form className='login-form' onSubmit={handleLogin}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <FloatingLabel 
                className='md-3' 
                label='Email address' 
                controlId='floatingInput'
                >
              <Form.Control 
                type='email' 
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
            <FloatingLabel 
                className='md-3' 
                label='Password'
                controlId='floatingInput'
                >
              <Form.Control 
                type='password' 
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                />
              </FloatingLabel>
            </Form.Group>
            <Container className='text-center button-container'>
              <Button variant='primary' type='submit' className='login-button shadow-sm'>
                Sign In
              </Button>
            </Container>
          </Form>
        </Container>
        <Container className='signup-box rounded text-center shadow-sm mt-4 p-3'>
          <h5 className='text-center'>
            <span className='new-account-text'>
              Need an account?
            </span>
          </h5>
          <Button variant='outline-light mt-1 mb-1'>
            Sign Up
          </Button>
        </Container>
      </Container>
    </>
  )
}

export default Login