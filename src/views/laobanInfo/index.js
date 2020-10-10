import React from 'react'
import './index.less'
import { Redirect } from 'react-router-dom'
import { Avatar } from '../../components'
import { connect } from 'react-redux'
import { detail } from '../../api'
import { withRouter } from 'react-router-dom'
import { Message } from '../../components'

@connect((state) => ({ state: state.userInfo }))
@withRouter
class DetailInfo extends React.PureComponent {
  state = {
    jobPosition: '',
    companyName: '',
    salary: '',
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
      companyName: this.state.companyName,
      salary: this.state.salary,
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
      <div className="detailInfo">
        <Message>{this.state.status}</Message>
        <div className="detailInfo_top">
          <h3>老板信息完善</h3>
          <h4>请选择头像</h4>
          <Avatar getAvatar={this.getAvatar} />
        </div>
        <div className="detailInfo_bottom">
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

            <label htmlFor="companyName">
              <span>公司名称:</span>
              <input
                type="text"
                onChange={(e) => this.change(e)}
                name="companyName"
                id="companyName"
              />
            </label>

            <label htmlFor="salary">
              <span>职位薪资:</span>
              <input
                type="text"
                name="salary"
                id="salary"
                onChange={(e) => this.change(e)}
              />
            </label>
            <label htmlFor="required">
              <span>职位要求:</span>
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
