import React from 'react'
import './index.less'
import { Redirect } from 'react-router-dom'
import { Avatar } from '../../components'
import { detail } from '../../api'
import { connect } from 'react-redux'
import { Message } from '../../components'
import { withRouter } from 'react-router-dom'

@connect((state) => ({ state: state.userInfo }))
@withRouter
class DetailInfo extends React.PureComponent {
  state = {
    jobPosition: '',
    required: '',
    avatar: '',
    status: { text: '登录成功', status: 0 },
  }

  change = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  getAvatar = (avt) => {
    this.setState({
      avatar: avt,
    })
  }

  submit = () => {
    const values = {
      jobPosition: this.state.jobPosition,
      required: this.state.required,
      avatar: this.state.avatar,
      insertId: this.props.state.insertId,
    }
    detail(values).then(
      (res) => {
        if (res.data.code === 0) {
          this.setState({
            status: { text: '完善成功', status: 1 },
          })
          setTimeout(() => {
            this.props.history.replace('/main')
          }, 1500)
        } else {
          this.setState({
            status: { text: '系统繁忙', status: 2 },
          })
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
    if (!this.props.state.isLogin || !this.props.location.state) {
      return <Redirect to="/login" />
    }
    return (
      <div className="dashen_detailInfo">
        <Message>{this.state.status}</Message>
        <div className="dashen_detailInfo_top">
          <h3>大神信息完善</h3>
          <h4>请选择头像</h4>
          <Avatar getAvatar={this.getAvatar} />
        </div>
        <div className="dashen_detailInfo_bottom">
          <form>
            <label htmlFor="jobPosition">
              <span> 招聘职位:</span>
              <input
                type="text"
                autoFocus
                onChange={(e) => this.change(e)}
                name="jobPosition"
                id="jobPosition"
              />
            </label>

            <label htmlFor="required">
              <span>个人介绍:</span>
              <textarea
                rows="2"
                type="text"
                name="required"
                id="required"
                onChange={(e) => this.change(e)}
              />
            </label>

            <label>
              <input
                type="button"
                onTouchEnd={() => this.submit()}
                value="保存"
              />
            </label>
          </form>
        </div>
      </div>
    )
  }
}
export default DetailInfo
