import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Axios from 'axios'

import { Container } from 'react-bootstrap'

import { Navbar, LoginForm, SignupForm } from '@components/index'
import { AuthMethods, getUserId } from '@utils/index'
import '@styles/Login.css'


function Login () {

  const auth = new AuthMethods()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignup, setShowSignup] = useState(false)
  const [loginAlert, setLoginAlert] = useState<string>('')
  const [signupAlert, setSignupAlert] = useState<string>('')

  useEffect(() => {
    if (location.pathname === '/login' && auth.loggedIn()) {
      navigate('/')
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const login = await auth.login(email, password)
      if (login) {
        auth.setCurrentUser({
          "email": email,
          "id": await getUserId(email)
        })
        navigate('/portfolio')
        } 
      } catch (err) {
        setEmail('')
        setPassword('')
        setLoginAlert(err.message)
    }
  }

  const handleShowSignup = async (e: any) => {
    e.preventDefault()
    setShowSignup(true)
  }

  const handleSignup = async (newEmail, newPassword) => {
    try {
      const res = await Axios.post('/api/create_user', {
        "email": newEmail,
        "password": newPassword,
      });
      if (res.status === 201) {
        await handleLogin(newEmail, newPassword);
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        setSignupAlert('A user with that email already exists. Please log in or use a different email.')
      } else {
        setSignupAlert('Something went wrong. Please try again.')
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container className='content-container'>
        {showSignup ? (
          <SignupForm 
            handleSignup={handleSignup} 
            signupAlert={signupAlert}
          />
        ) : (
          <LoginForm
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
            handleShowSignup={handleShowSignup}
            loginAlert={loginAlert}
          />
        )}  
      </Container>
    </>
  )
}

export default Login