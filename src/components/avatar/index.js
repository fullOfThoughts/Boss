import React from 'react'
import './index.less'

export default class Avatar extends React.PureComponent {
  state = {
    liArr: [],
  }
  componentWillMount() {
    //  创建长度为20 的数组
    let liArr = []
    for (let i = 0; i < 20; i++) {
      liArr.push(0)
    }
    this.setState({ liArr })
  }
  //  选中改变背景
  choose = (index) => {
    const newArr = []
    this.props.getAvatar(`http://qhtwg8x46.hb-bkt.clouddn.com/${index + 1}.png`)
    for (let i = 0; i < 20; i++) {
      if (index === i) {
        newArr.push(1)
      } else {
        newArr.push(0)
      }
    }

    this.setState({ liArr: newArr })
  }

  render() {
    return (
      <ul className="avatar">
        {this.state.liArr.map((item, index) => {
          return (
            <li
              className={item === 0 ? '' : 'avatar_active'}
              key={index}
              onTouchEnd={() => this.choose(index)}
            >
              <img
                src={`http://qhtwg8x46.hb-bkt.clouddn.com/${index + 1}.png`}
                alt="avatar"
              />
            </li>
          )
        })}
      </ul>
    )
  }
}
