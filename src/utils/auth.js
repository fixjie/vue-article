const TokenKey = 'vue_article_token'
const AvatarKey = 'vue_article_avatar'
const NameKey = 'vue_article_name'
const RootKey = 'vue_article_root'

// token
export function getToken () {
  return localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return localStorage.removeItem(TokenKey)
}

// 用户名
export function getName () {
  return localStorage.getItem(NameKey)
}

export function setName (name) {
  return localStorage.setItem(NameKey, name)
}

export function removeName () {
  return localStorage.removeItem(NameKey)
}

// 头像
export function getAvatar () {
  return localStorage.getItem(AvatarKey)
}

export function setAvatar (AvatarUrl) {
  return localStorage.setItem(AvatarKey, AvatarUrl)
}

export function removeAvatar () {
  return localStorage.removeItem(AvatarKey)
}

// 权限
export function setRoot (root) {
  return localStorage.setItem(RootKey, root)
}
export function getRoot () {
  return localStorage.getItem(RootKey)
}
