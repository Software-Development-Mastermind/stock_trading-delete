import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios'

import { Container } from 'react-bootstrap'

import { Navbar, LoginForm, SignupForm } from '@components/index'
import { AuthMethods, getUserId } from '@utils/index'
import '@styles/Login.css'

function Login () {

  const auth = new AuthMethods()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignup, setShowSignup] = useState(false)

  useEffect(() => {
    if (auth.loggedIn()) {
      navigate('/')
    }
  }, []);

  const handleLogin = async (email, password) => {
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
        navigate('/');
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <>
      <Navbar />
      <Container className='content-container'>
        {showSignup ? (
          <SignupForm onSignup={handleSignup} />
        ) : (
          <LoginForm
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            email={email}
            password={password}
            handleShowSignup={handleShowSignup}
          />
        )}  
      </Container>
    </>
  )
}

export default Login