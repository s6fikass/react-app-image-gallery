import React from 'react'
import { useTranslation } from 'react-i18next'
import { Typography } from 'antd'
import ScaleLoader from 'react-spinners/ScaleLoader'
import classes from './style.module.css'

const { Text } = Typography

const Loading: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className={classes.loading}>
      <ScaleLoader
        color='#3e416d'
        height={100}
        width={8}
        radius={8}
        margin={4}
        loading
      />
      <Text className={classes.text}>{t('pleaseWait')}</Text>
    </div>
  )
}

export default Loading
