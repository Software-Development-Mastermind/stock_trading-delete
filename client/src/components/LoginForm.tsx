import { 
  Container, 
  Form, 
  Button, 
  FloatingLabel 
} from 'react-bootstrap';


function LoginForm({ 
  handleLogin, 
  setEmail, 
  setPassword, 
  email, 
  password, 
  handleShowSignup 
}) {

const handleSubmit = (e: any) => {
  e.preventDefault();
  console.log(`Login: ${email} ${password}`);
  if (email !== '' && password !== '') {
    handleLogin(email, password);
  }
}
  
  return (

    <>
      <Container className='login-box rounded shadow-sm'>
        <h3 className='login-header text-center mt-3 mb-3'>Welcome back.</h3>
        <Form className='login-form' onSubmit={handleSubmit}>
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
        <Button variant='outline-light mt-1 mb-1' onClick={handleShowSignup}>
          Sign Up
        </Button>
      </Container>
    </>

  )
}

export default LoginForm;