import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import './assets/init.less'

window.p = []
window._clearRequest = () => {
  if (window.p.length !== 0) {
    window.p.forEach((item) => {
      item()
    })
    window.p = []
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
