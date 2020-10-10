import React from 'react'
import error from '../../assets/error.svg'
export default class Error extends React.PureComponent {
  state = {}
  render() {
    return (
      <i
        style={{
          width: '100%',
          height: '100%',
          display: this.props.state === 2 ? 'block' : 'none',
          background: `url(${error})`,
          backgroundSize: '100%,100%',
          backgroundRepeat: 'no-repeat',
        }}
      ></i>
    )
  }
}
