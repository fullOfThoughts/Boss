import React from 'react'
import './index.less'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

@connect((state) => ({ state: state.userInfo }))
@withRouter
class MainFrame extends React.PureComponent {
  state = {
    title: '',
    navBar: [],
  }
  //  初始化页面数据
  componentDidMount() {
    if (this.props.state.userType === '1') {
      this.setState(
        {
          title: '老板列表',
          navBar: [
            {
              name: '老板',
              img: 'home',
              title: '老板列表',
              isChoose: true,
              pathname: '/main/userlist',
            },
            {
              name: '消息',
              img: 'message',
              title: '消息',
              isChoose: false,
              pathname: '/main/usermessage',
            },
            {
              name: '个人',
              img: 'person',
              title: '个人中心',
              isChoose: false,
              pathname: '/main/usercenter',
            },
          ],
        },
        () => {
          this.props.history.push(this.state.navBar[0].pathname)
        }
      )
    } else {
      this.setState({
        title: '大神列表',
        navBar: [
          {
            name: '大神',
            img: 'dashen',
            title: '大神列表',
            isChoose: true,
            pathname: '/main/userlist',
          },
          {
            name: '消息',
            img: 'message',
            title: '消息',
            isChoose: false,
            pathname: '/main/usermessage',
          },
          {
            name: '个人',
            img: 'person',
            title: '个人中心',
            isChoose: false,
            pathname: '/main/usercenter',
          },
        ],
      })
    }
  }
  //  改变背景颜色
  switch = (index) => {
    const navBar = [...this.state.navBar]
    navBar.forEach((item, i) => {
      item.isChoose = false
      if (index === i) {
        item.isChoose = true
        this.setState({
          title: item.title,
        })
        this.props.history.push(item.pathname)
      }
      return item
    })
    this.setState({ navBar: navBar })
  }
  render() {
    return (
      <div className="MainFrame">
        <div className="MainFrame_header">{this.state.title}</div>
        <div className="MainFrame_con">{this.props.children}</div>
        <div className="MainFrame_bottom">
          {this.state.navBar.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  backgroundColor: item.isChoose ? 'skyblue' : 'white',
                }}
                onTouchEnd={() => this.switch(index)}
              >
                <img
                  src={`http://qhtwg8x46.hb-bkt.clouddn.com/${item.img}.png`}
                  alt={item.img}
                />
                <span>{item.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
export default MainFrame
