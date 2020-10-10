import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { outer } from './route'

export default class App extends React.PureComponent {
  state = {}
  render() {
    return (
      <Router>
        <Switch>
          {outer.map((item) => {
            return (
              <Route
                key={item.path}
                exact={item.exact}
                path={item.path}
                component={item.component}
              />
            )
          })}
          <Redirect from="/" to="/register" />
          <Redirect to="/404" />
        </Switch>
      </Router>
    )
  }
}
