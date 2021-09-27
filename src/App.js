import { Component, lazy, Suspense, Fragment } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { UserContextProvider } from 'Context/userContext'
import { AppContextProvider } from 'Context/AppContext'

const Login = lazy(() => import('views/Login'))
const Registro = lazy(() => import('views/Registro'))
const Layout = lazy(() => import('Containers/Layout'))

class App extends Component {
  render () {
    return (
      <Fragment>
      <UserContextProvider>
      <AppContextProvider>
        <Router>
          <Suspense fallback={<p>Sopas...</p>}>
          <Switch>
            <Route
              exact
              path="/login"
              name="login"
              render={(props) => <Login {...props} /> }
            />
            <Route
              exact
              path="/registro"
              name="registro"
              render={(props) => <Registro {...props} /> }
            />
             <Route path="/" name="Home" component={Layout} />
          </Switch>
          </Suspense>
        </Router>
        </AppContextProvider>
        </UserContextProvider>
    </Fragment>
    )
  }
}

export default App
