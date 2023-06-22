import axios from 'axios';

class AuthHelperMethods {

  login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/users/authenticate', { email, password });
      const res_data = res.data
      this.setToken(res_data.token)
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
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
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

}

export default AuthHelperMethods