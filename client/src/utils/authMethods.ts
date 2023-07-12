import axios from 'axios';
import decode from 'jwt-decode'

 


interface IAuthMethods {
  login: (email: string, password: string) => Promise<boolean>
  loggedIn: () => boolean
  isTokenExpired: (token: string) => boolean
  decodeToken: (token: string) => object
}

class AuthMethods implements IAuthMethods {


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
    const user = this.getCurrentUser()
    return !!token && !this.isTokenExpired(token) && !!user
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
    localStorage.removeItem('user')
    this.setCurrentUser({})
  }

  decodeToken = (token: string) => {
    try {
      return decode(token)
    } catch (err) {
      console.log(`Decoding token failed: ${err}`)
      return null
    }
  }

  setCurrentUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user))
  }

  getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

}

export default AuthMethods;
