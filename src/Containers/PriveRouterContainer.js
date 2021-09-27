import React, { Fragment, Suspense, useEffect } from 'react'
import { Switch, Redirect, Route, useHistory } from 'react-router-dom'
import { UserState } from 'Context/userContext'
import routes from '../routes'

const loading = (
  <div className="lds-circle">
    <div>Cargando...</div>
  </div>
)

const PriveRouterContainer = (props) => {
  const { state } = UserState()
  const { user } = state.context
  const { push } = useHistory()

  useEffect(() => {
    if (user) {
      return user
    } else if (user === undefined) {
      return push('/login')
    }
  }, [state])

  return (
    <Fragment>
      <Suspense fallback={loading}>
        <Switch>
          {
            routes.map((route, index) => {
              return route.component && (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={props => <route.component {...props } />}
                  />
              )
            })
          }
          <Redirect from='/' to="dashboard" />
        </Switch>
      </Suspense>
    </Fragment>
  )
}

export default React.memo(PriveRouterContainer)
