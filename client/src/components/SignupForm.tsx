

import { useState } from 'react';

import { Container, Form, Button, FloatingLabel } from 'react-bootstrap';

function SignupForm({ onSignup }) {

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const isEmailValid = email === confirmEmail && email !== '';
  const isPasswordValid = password === confirmPassword && password !== '';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid && isPasswordValid) {
      onSignup(e, email, password);
    } else {
      console.log('Invalid email or password.');
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
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={handleEmailChange}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className='mb-3' controlId='formConfirmEmail'>
            <FloatingLabel className='md-3' label='Confirm Email' controlId='floatingInput'>
              <Form.Control
                type='email'
                placeholder='Confirm email'
                value={confirmEmail}
                onChange={handleConfirmEmailChange}
              />
            </FloatingLabel>
            {!isEmailValid && <p className='text-danger'>Emails do not match.</p>}
          </Form.Group>
          <Form.Group controlId='formBasicPassword'>
            <FloatingLabel className='md-3' label='Password' controlId='floatingInput'>
              <Form.Control
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
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
            </FloatingLabel>
            {!isPasswordValid && <p className='text-danger'>Passwords do not match.</p>}
          </Form.Group>
          <Container className='text-center button-container'>
            <Button variant='primary' type='submit' className='login-button shadow-sm'>
              Sign Up
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
}

export default SignupForm;