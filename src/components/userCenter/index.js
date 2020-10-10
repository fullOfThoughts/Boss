import React from 'react'
import { getUserCenter } from '../../api'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './index.less'
import { userinfo } from '../../redux/actions'

@connect((state) => ({ state: state.userInfo }), { userinfo })
@withRouter
class UserCenter extends React.PureComponent {
  state = {
    data: {},
  }

  componentDidMount() {
    getUserCenter({ insertId: this.props.state.insertId }).then(
      (res) => {
        console.log(res.data[0])
        this.setState({
          data: res.data[0],
        })
      },
      (err) => {}
    )
  }
  //  退出登录
  exit = () => {
    this.props.userinfo({ data: { isLogin: false } })
    this.props.history.replace('/login')
  }
  //  组件卸载取消所有请求
  componentWillUnmount() {
    window._clearRequest()
  }

  render() {
    return (
      <div className="UserCenter">
        <div className="UserCenter_top">
          <img src={this.state.data.avatar} alt="avatar" />
          <span>{this.state.data.userName}</span>
        </div>
        <h3>相关信息</h3>
        <div className="UserCenter_con">
          <span>职位：{this.state.data.jobPosition}</span>
          <span>简介：{this.state.data.required}</span>
          <span
            style={{
              display: this.props.state.userType === '1' ? 'none' : 'block',
            }}
          >
            薪资：{this.state.data.salary}
          </span>
        </div>
        <div className="UserCenter_bottom" onTouchEnd={() => this.exit()}>
          退出登录
        </div>
      </div>
    )
  }
}
export default UserCenter
