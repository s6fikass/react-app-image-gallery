import React, { useContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import Login from '../components/login'
import classes from '../styles/root.module.css'
import AppContext from '../../core/contexts/app/context'

const AuthLayout: React.FC = () => {
  const { direction } = useContext(AppContext)

  return (
    <Layout dir={direction} className={classes.authContainer}>
      <Switch>
        <Redirect from='/auth' exact to='/auth/login' />
        <Route path='/auth/login' component={Login} />
        <Redirect from='*' to='/auth' />
      </Switch>
    </Layout>
  )
}

export default AuthLayout
