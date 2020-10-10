import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { MainFrame } from '../../containers'
import { Switch, Route } from 'react-router-dom'
import { inner } from '../../route'

@connect((state) => ({ state: state.userInfo }))
class Main extends React.PureComponent {
  state = {}

  render() {
    if (!this.props.state.isLogin) {
      return <Redirect to="/login" />
    }
    return (
      <MainFrame>
        <Switch>
          {inner.map((item, index) => {
            return (
              <Route
                key={item.path}
                exact={item.exact}
                path={item.path}
                component={item.component}
              />
            )
          })}
        </Switch>
      </MainFrame>
    )
  }
}
export default Main
