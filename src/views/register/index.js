import React from 'react'
import { withRouter } from 'react-router-dom'
import { LoginAndRegister } from '../../containers'
import { Right, Error } from '../../components'
import { connect } from 'react-redux'
import { userinfo } from '../../redux/actions'
import { register } from '../../api'
import './index.less'
import { Message } from '../../components'

@connect((state) => ({ state: state.userInfo }), { userinfo })
@withRouter
class Register extends React.PureComponent {
  state = {
    isChecked: true,
    userName: '',
    password: '',
    confirmPassword: '',
    userType: '1',
    userNameTest: 0,
    passwordTest: 0,
    confirmPasswordTest: 0,
    status: { text: '登录成功', status: 0 },
  }
  change = (e) => {
    if (e.target.name === 'userType') {
      if (e.target.value === '1') {
        this.setState({ isChecked: true })
      } else {
        this.setState({ isChecked: false })
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  skip = () => {
    this.props.history.push('/login')
  }
  submit = () => {
    const values = {
      userName: this.state.userName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userType: this.state.userType,
    }
    //  验证用户名
    if (!/^[\u4e00-\u9fa5]{0,10}$/.test(values.userName)) {
      this.setState({ userNameTest: 2 })
      return
    } else {
      this.setState({ userNameTest: 1 })
    }
    //  验证密码
    if (!/^[a-zA-Z]\w{5,17}$/.test(values.password)) {
      this.setState({
        passwordTest: 2,
      })
      return
    } else {
      this.setState({
        passwordTest: 1,
      })
    }
    //  确认密码
    if (values.password !== values.confirmPassword) {
      this.setState({
        confirmPasswordTest: 2,
      })
      return
    } else {
      this.setState({
        confirmPasswordTest: 1,
      })
    }
    //  向后端发送请求注册
    register({
      userName: values.userName,
      password: values.password,
      userType: values.userType,
    }).then(
      (res) => {
        if (res.data.code === 0) {
          //  显示成功结果

          res.data.data.data.isLogin = true

          this.props.userinfo(res.data.data)

          window.localStorage.setItem(
            'userInfo',
            JSON.stringify({ data: res.data.data, createAt: Date.now() })
          )
          this.setState(
            {
              status: { text: '注册成功', status: 1 },
            },
            () => {
              setTimeout(() => {
                this.setState({
                  status: { text: '', status: 0 },
                })

                if (values.userType === '1') {
                  this.props.history.replace({
                    pathname: '/dasheninfo',
                    state: true,
                  })
                } else {
                  this.props.history.replace({
                    pathname: '/laobaninfo',
                    state: true,
                  })
                }
              }, 1500)
            }
          )
        } else {
          //  显示失败结果
          this.setState(
            {
              status: { text: '用户已存在', status: 2 },
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

  //  组件卸载取消所有请求
  componentWillUnmount() {
    window._clearRequest()
  }
  render() {
    return (
      <LoginAndRegister>
        <Message>{this.state.status}</Message>
        <div className="register">
          <form>
            <label htmlFor="userName">
              <span> 用户名:</span>
              <input
                type="text"
                autoFocus
                onChange={(e) => this.change(e)}
                name="userName"
                id="userName"
              />

              <small>
                <Right state={this.state.userNameTest}></Right>
                <Error state={this.state.userNameTest}></Error>
              </small>
              <strong>
                {this.state.userNameTest === 2 ? '用户名必须为中文' : ''}
              </strong>
            </label>

            <label htmlFor="password">
              <span>密码:</span>
              <input
                type="password"
                onChange={(e) => this.change(e)}
                name="password"
                id="password"
              />
              <small>
                <Right state={this.state.passwordTest}></Right>
                <Error state={this.state.passwordTest}></Error>
              </small>
              <strong>
                {this.state.passwordTest === 2 ? '必须以字母开头6~18' : ''}
              </strong>
            </label>

            <label htmlFor="confirmPassword">
              <span>确认密码:</span>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                onChange={(e) => this.change(e)}
              />
              <small>
                <Right state={this.state.confirmPasswordTest}></Right>
                <Error state={this.state.confirmPasswordTest}></Error>
              </small>
              <strong>
                {this.state.confirmPasswordTest === 2 ? '密码不一致' : ''}
              </strong>
            </label>

            <label>
              <span>用户类型:</span>
              <input
                type="radio"
                name="userType"
                onChange={(e) => this.change(e)}
                value="1"
                checked={this.state.isChecked}
              />
              大神
              <input
                type="radio"
                name="userType"
                onChange={(e) => this.change(e)}
                value="2"
                checked={!this.state.isChecked}
              />
              老板
            </label>
            <label>
              <input
                type="button"
                onTouchEnd={() => this.submit()}
                value="注册"
              />
            </label>
            <label>
              <input
                type="button"
                onTouchEnd={() => this.skip()}
                value="已有账户？"
              />
            </label>
          </form>
        </div>
      </LoginAndRegister>
    )
  }
}
export default Register
