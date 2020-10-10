import React from 'react'
import './index.less'
export default class LoginAndRegister extends React.PureComponent {
  state = {}
  render() {
    return (
      <div className="LoginAndRegister">
        <div className="LoginAndRegister_top">
          <div className="LoginAndRegister_top_header">Boss 直聘</div>
          <div className="LoginAndRegister_top_bottom">
            <span>Boss</span>
            <span>直聘</span>
          </div>
        </div>
        <div className="LoginAndRegister_bottom">{this.props.children}</div>
      </div>
    )
  }
}
