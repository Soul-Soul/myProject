import Cookies from 'js-cookie'

const TokenKey = 'PWEB_TICKETID'
const SecretKey = 'pweb-login-secret-key'

export function getToken() {
  const token = Cookies.get(TokenKey)
  if (token) {
    return Cookies.get(TokenKey)
  } else {
    return ''
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function toBlank(params) {
  if (!params) {
    return ''
  } else {
    return params
  }
}

export function getSecret() {
  const token = Cookies.get(SecretKey)
  if (token) {
    return Cookies.get(SecretKey)
  } else {
    return ''
  }
}

export function setSecret(token) {
  return Cookies.set(SecretKey, token)
}

export function removeSecret() {
  return Cookies.remove(SecretKey)
}
