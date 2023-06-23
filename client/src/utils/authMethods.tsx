import axios from 'axios';
import decode from 'jwt-decode'

class AuthMethods {

  login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/authenticate', { 
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const res_data = res.data
      console.log(res_data.message)
      console.log(`Token is: ${res_data.access_token}`)
      this.setToken(res_data.access_token)
      return true
    } catch (err) {
      console.log(`Authenticating user failed: ${err}`)
      return false
    }
  }

  loggedIn = () => {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  isTokenExpired = (token: string) => {
    try {
      const decodedToken = this.decodeToken(token)
      if (decodedToken.exp < Date.now() / 1000) {
        console.log('Token expired')
        return true;
      }
      return false
    } catch (err) {
      console.log(`Token expired check failed: ${err}`)
      return false
    }
  }

  setToken = (token: string) => {
    if (token) {
      localStorage.setItem('token', token)
    }
  }

  getToken = () => {
    return localStorage.getItem('token')
  }

  logout = () => {
    localStorage.removeItem('token')
  }

  decodeToken = (token: string) => {
    try {
      const decodedToken = decode(token)
      return decodedToken
    } catch (err) {
      console.log(`Decoding token failed: ${err}`)
      return null
    }
  }

}

export default AuthMethods