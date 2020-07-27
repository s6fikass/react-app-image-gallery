import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthLayout from './auth-layout'
import SiteLayout from './site-layout'
import AppContext from '../../core/contexts/app/context'

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useContext(AppContext)

  return (
    <Switch>
      {isAuthenticated && <Redirect from='/auth' to='/' />}
      <Route path='/auth' component={AuthLayout} />
      <Route path='/' component={SiteLayout} />
    </Switch>
  ) 
}

export default AppRouter
