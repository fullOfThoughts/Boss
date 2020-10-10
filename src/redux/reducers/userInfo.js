import { userInfo } from '../action-types'

let initUserInfo = {}

if (window.localStorage.getItem('userInfo')) {
  initUserInfo = JSON.parse(window.localStorage.getItem('userInfo')).data
  if (Date.now() - initUserInfo.createAt > 1000 * 60 * 60 * 24) {
    window.localStorage.removeItem('userInfo')
    initUserInfo = {}
  }
}

export default (state = initUserInfo.data, action) => {
  switch (action.type) {
    case userInfo:
      return Object.assign({}, initUserInfo.data, action.data.data)
    default:
      return state
  }
}
