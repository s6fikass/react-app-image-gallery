import React, { useContext } from 'react'
import { Layout } from 'antd'
import AppContext from '../../core/contexts/app/context'
import classes from '../styles/root.module.css'
import Filters from '../components/imgur/filters'
import ImagesList from '../components/imgur/images-list'

const { Content } = Layout

const SiteLayout: React.FC = () => {
  const { direction } = useContext(AppContext)

  return (
    <Layout dir={direction}>
      <Content className={classes.content}>
        <Filters />
        <ImagesList />
      </Content>
    </Layout>
  )
}

export default SiteLayout
