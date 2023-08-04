import axios from 'axios';
{/* @ts-ignore */}
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
      this.setToken(res_data.access_token)
      return true
    } catch (err: any) {
      if (err.response.status === 401) {
        throw new Error('Incorrect email or password.')
      } else {
        throw new Error('Something went wrong. Please try again.')
      }
    }
  }

  loggedIn = () => {
    const token = this.getToken()
    const user = this.getCurrentUser()
    return !!token && !this.isTokenExpired(token) && user
  }

  isTokenExpired = (token: string) => {
    try {
      const decodedToken: any = this.decodeToken(token)
      if (decodedToken.exp < Date.now() / 1000) {
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

  decodeToken = (token: string): object => {
    try {
      return decode(token) as object;
    } catch (err) {
      console.log(`Decoding token failed: ${err}`)
      return {}
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
