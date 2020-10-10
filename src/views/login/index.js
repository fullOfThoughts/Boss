import React from 'react'
import { withRouter } from 'react-router-dom'
import { LoginAndRegister } from '../../containers'
import { login } from '../../api'
import { connect } from 'react-redux'
import { userinfo } from '../../redux/actions'
import './index.less'
import { Message } from '../../components'

@connect((state) => ({ state: state.userInfo }), { userinfo })
@withRouter
class Login extends React.PureComponent {
  state = {
    userName: '',
    password: '',
    status: { text: '登录成功', status: 0 },
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  componentDidMount() {
    if (this.props.state.isLogin) {
      this.props.history.replace('/main')
    }
  }
  submit = () => {
    const values = {
      userName: this.state.userName,
      password: this.state.password,
    }
    login(values).then(
      (res) => {
        //  登录成功
        if (res.data.code === 0) {
          res.data.data.isLogin = true

          this.props.userinfo({ data: res.data.data })
          window.localStorage.setItem(
            'userInfo',
            JSON.stringify({ data: res.data.data, createAt: Date.now() })
          )
          this.setState(
            {
              status: { text: '登录成功', status: 1 },
            },
            () => {
              setTimeout(() => {
                this.setState({
                  status: { text: '', status: 0 },
                })
                this.props.history.push('/main')
              }, 1500)
            }
          )
        } else if (res.data.code === 1) {
          //  数据库异常处理
          this.setState(
            {
              status: { text: '数据库异常', status: 2 },
            },
            () => {
              setTimeout(() => {
                this.setState({
                  status: { text: '', status: 0 },
                })
              }, 1500)
            }
          )
        } else if (res.data.code === 2) {
          //  用户不存在
          this.setState(
            {
              status: { text: '用户不存在', status: 2 },
            },
            () => {
              setTimeout(() => {
                this.setState({
                  status: { text: '', status: 0 },
                })
              }, 1500)
            }
          )
        }
      },
      (err) => {}
    )
  }
  skip = () => {
    this.props.history.push('/register')
  }

  //  组件卸载取消所有请求
  componentWillUnmount() {
    window._clearRequest()
  }

  render() {
    return (
      <LoginAndRegister>
        <Message>{this.state.status}</Message>
        <div className="login">
          <form>
            <label htmlFor="userName">
              <span> 用户名:</span>{' '}
              <input
                type="text"
                onChange={(e) => this.change(e)}
                autoFocus
                name="userName"
                id="userName"
              />
            </label>

            <label htmlFor="password">
              <span>密码:</span>
              <input
                type="password"
                onChange={(e) => this.change(e)}
                name="password"
                id="password"
              />
            </label>
            <label>
              <input
                type="button"
                onTouchEnd={() => this.submit()}
                value="登录"
              />
            </label>
            <label>
              <input
                onTouchEnd={() => this.skip()}
                type="button"
                value="还没账户？"
              />
            </label>
          </form>
        </div>
      </LoginAndRegister>
    )
  }
}
export default Login
