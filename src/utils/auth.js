import Cookies from 'js-cookie'

const TokenKey = 'Token';
const RefreshTokenKey = 'RefreshToken';
const ExpiresTimestampKey = 'ExpiresTimestamp';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getRefreshToken() {
  return Cookies.get(RefreshTokenKey);
}

export function setRefreshToken(refreshToken) {
  return Cookies.set(RefreshTokenKey, refreshToken);
}

export function removeRefreshToken() {
  return Cookies.remove(RefreshTokenKey);
}

export function getExpiresTimestamp() {
  return Cookies.get(ExpiresTimestampKey);
}

export function setExpiresTimestamp(expiresTimestamp) {
  return Cookies.set(ExpiresTimestampKey, expiresTimestamp);
}

export function removeExpiresTimestamp() {
  return Cookies.remove(ExpiresTimestampKey);
}
