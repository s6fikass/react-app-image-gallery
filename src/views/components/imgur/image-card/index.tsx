import React from 'react'
import { Typography } from 'antd'
import classes from './style.module.css'

const { Paragraph } = Typography

interface IImageCardProps {
  image: {
    id: string
    title: string
    description: string
    ups: number
    downs: number
    link: string
    datetime: number
    comment_count: number
    points: number
    score: number
    size: number
    views: number
  }
  onPress?: (image: {
    id: string
    title: string
    description: string
    ups: number
    downs: number
    link: string
    datetime: number
    comment_count: number
    points: number
    score: number
    size: number
    views: number
  }) => void
}

const ImageCard: React.FC<IImageCardProps> = (props) => {
  return (
    <div
      className={classes.card}
      onClick={() => props.onPress && props.onPress(props.image)}
    >
      <img src={props.image.link} alt='--' className={classes.image} />
      {props.image.description && (
        <Paragraph className={classes.description} ellipsis={{ rows: 2 }}>
          {props.image.description}
        </Paragraph>
      )}
    </div>
  )
}

export default ImageCard
