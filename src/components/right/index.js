import React from 'react'
import right from '../../assets/right.svg'
export default class Right extends React.PureComponent {
  state = {}
  render() {
    return (
      <i
        style={{
          width: '100%',
          height: '100%',
          display: this.props.state === 1 ? 'block' : 'none',
          background: `url(${right})`,
          backgroundSize: '100%,100%',
          backgroundRepeat: 'no-repeat',
        }}
      ></i>
    )
  }
}
