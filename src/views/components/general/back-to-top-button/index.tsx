import React, { useContext, useState } from 'react'
import classes from './style.module.css'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import AppContext from '../../../../core/contexts/app/context'

const BackToTopButton: React.FC = () => {
  const { direction } = useContext(AppContext)

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 200) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 200) {
      setShowScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  window.addEventListener('scroll', checkScrollTop)

  return (
    <Button
      className={classes.button}
      style={
        direction === 'rtl'
          ? {
              left: 0,
              display: showScroll ? 'inline-block' : 'none',
              transition: '0.3s',
            }
          : {
              right: 0,
              display: showScroll ? 'inline-block' : 'none',
              transition: '0.3s',
            }
      }
      type='primary'
      shape='circle'
      onClick={scrollTop}
      icon={<FontAwesomeIcon icon={faChevronUp} />}
    />
  )
}

export default BackToTopButton
