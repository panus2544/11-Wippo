import Cookies from 'js-cookie'

const CookiesService = {
  setCookie (name, value) {
    Cookies.set(name, value)
  },
  getCookie (name) {
    return Cookies.get(name)
  },
  gettokenJWTCookie () {
    return Cookies.get('tokenJWT')
  },
  getEmailCookie () {
    return Cookies.get('email')
  }
}
export default CookiesService
