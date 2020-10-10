import React from 'react'
import './index.less'
import { connect } from 'react-redux'
import { getUserList } from '../../api'

@connect((state) => ({ state: state.userInfo }))
class UserList extends React.PureComponent {
  state = {
    data: [],
  }

  componentDidMount() {
    //  初始化页面数据
    if (this.props.state.userType === '1') {
      getUserList({ userType: '2', page: 1 }).then((res) => {
        if (res.data.code === 1) {
        } else {
          this.setState({ data: res.data.data })
        }
      })
    } else {
      getUserList({ userType: '1', page: 1 }).then(
        (res) => {
          if (res.data.code === 1) {
          } else {
            this.setState({ data: res.data.data })
          }
        },
        (err) => {}
      )
    }
  }

  //  组件卸载取消所有请求
  componentWillUnmount() {
    window._clearRequest()
  }
  render() {
    return (
      <div className="userlist">
        {this.state.data.map((item, index) => {
          return (
            <div className="userlist_item" key={index}>
              <div className="userlist_item_top">
                <img src={item.avatar} alt="avatar" />
                <span>{item.userName}</span>
              </div>
              <div className="userlist_item_bottom">
                <div className="userlist_item_bottom_left">
                  <span>职位:</span>
                  <span
                    style={{
                      display:
                        this.props.state.userType === '1' ? 'block' : 'none',
                    }}
                  >
                    公司:
                  </span>
                  <span
                    style={{
                      display:
                        this.props.state.userType === '1' ? 'block' : 'none',
                    }}
                  >
                    月薪:
                  </span>
                  <span>描述:</span>
                </div>
                <div className="userlist_item_bottom_right">
                  <span>{item.jobPosition}</span>
                  <span
                    style={{
                      display:
                        this.props.state.userType === '1' ? 'block' : 'none',
                    }}
                  >
                    {item.companyName}
                  </span>
                  <span
                    style={{
                      display:
                        this.props.state.userType === '1' ? 'block' : 'none',
                    }}
                  >
                    {item.salary}
                  </span>
                  <span>{item.required}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default UserList
