import React from 'react'
import './index.less'
import { Right, Error } from '../index'

export default class Message extends React.PureComponent {
  state = {}
  render() {
    return (
      <div
        className="message"
        style={{
          display:
            this.props.children.status === 1 || this.props.children.status === 2
              ? 'flex'
              : 'none',
        }}
      >
        <div className="message_left">{this.props.children.text}</div>
        <div className="message_right">
          <Right state={this.props.children.status}></Right>
          <Error state={this.props.children.status}></Error>
        </div>
      </div>
    )
  }
}
