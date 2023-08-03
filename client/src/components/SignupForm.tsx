

import { useState } from 'react';

import { 
  Container, 
  Form, 
  Button, 
  FloatingLabel 
} from 'react-bootstrap';

interface SignupFormProps {
  handleSignup: (email: string, password: string) => void;
  signupAlert: string;
}

function SignupForm({ handleSignup, signupAlert }: SignupFormProps) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordIsValid = password === confirmPassword && password !== '';

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: any) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (passwordIsValid) {
      handleSignup(email, password);
    }
  };

  return (
    <>
      <Container className='login-box rounded shadow-sm'>
        <h3 className='login-header text-center mt-3 mb-3'>Create an Account.</h3>
        <Form className='login-form' onSubmit={handleSubmit}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <FloatingLabel className='md-3' label='Email address' controlId='floatingInput'>
              <Form.Control
                className='shadow-sm'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleEmailChange}
              />
            </FloatingLabel>
          </Form.Group>
          {signupAlert !== '' && <p className='text-danger p-1'>{signupAlert}</p>}
          <Form.Group controlId='formBasicPassword'>
            <FloatingLabel className='md-3' label='Password' controlId='floatingInput'>
              <Form.Control
                className='shadow-sm'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={handlePasswordChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId='formConfirmPassword'>
            <FloatingLabel className='md-3' label='Confirm Password' controlId='floatingInput'>
              <Form.Control
                className='mt-1 shadow-sm'
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </FloatingLabel>
            {(confirmPassword !== '' && !passwordIsValid) && <p className='text-danger p-1'>Passwords do not match.</p>}
          </Form.Group>
          <Container className='text-center button-container'>
            <Button 
              variant='primary' 
              type='submit' 
              className='login-button shadow-sm'
              disabled={!passwordIsValid}
              >
              Sign Up
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
}

export default SignupForm;