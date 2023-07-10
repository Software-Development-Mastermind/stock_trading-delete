import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Container, Form, FloatingLabel } from 'react-bootstrap'

import Navbar from '@components/Navbar'
import { AuthMethods, AuthContext } from '@utils/index'
import '@styles/Login.css'

function Login () {

  const { user, setUser } = useContext(AuthContext);

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
        setUser(email)
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
        <Container className='login-box rounded shadow'>
          <h3 className='text-center mt-3 mb-3'>Login</h3>
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
            <Form.Group className='mb-3' controlId='formBasicPassword'>
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