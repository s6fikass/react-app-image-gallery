import React, { useContext, useState } from 'react'
import classes from './style.module.css'
import ImgurContext from '../../../../core/contexts/imgur/context'
import { Result, Button, List, Modal, Row, Col, Typography } from 'antd'
import ImageCardLoading from '../image-card-loading'
import ImageCard from './../image-card/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const { Text } = Typography

const ImagesList: React.FC = () => {
  const { data, loading, error, actions } = useContext(ImgurContext)
  const [modalVisible, setModalVisible] = useState(false)
  const [image, setImage] = useState<{
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
  }>()

  if (error) {
    return (
      <Result
        className={classes.list}
        status='500'
        title='Cannot Fetch Images'
        extra={
          <Button type='primary' onClick={actions.getData}>
            Retry
          </Button>
        }
      />
    )
  }

  if (loading) {
    return (
      <List
        className={classes.list}
        grid={{
          gutter: 24,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        renderItem={(item) => (
          <List.Item>
            <ImageCardLoading />
          </List.Item>
        )}
      />
    )
  }

  if (data) {
    const imagesList: {
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
    }[] = []
    data?.data.forEach((a) => {
      if (a.images) {
        a.images.forEach((i) => imagesList.push(i))
      }
    })
    return (
      <React.Fragment>
        <List
          className={classes.list}
          grid={{
            gutter: 24,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={imagesList}
          renderItem={(item) => (
            <List.Item>
              <ImageCard
                image={item}
                onPress={(img) => {
                  setImage(img)
                  setModalVisible(true)
                }}
              />
            </List.Item>
          )}
        />
        <Modal
          style={{ top: 10 }}
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onOk={() => setModalVisible(false)}
          closable
          closeIcon={<FontAwesomeIcon icon={faTimes} />}
          width='95vw'
          title={image?.title ?? '.'}
        >
          <div className={classes.modal}>
            <Row>
              <Col span={11}>
                <img
                  src={image?.link}
                  alt='--'
                  className={classes.modalImage}
                />
                <Text className={classes.text}>{`Ups: ${image?.ups}`}</Text>
                <Text className={classes.text}>{`Downs: ${image?.downs}`}</Text>
                <Text className={classes.text}>{`Score: ${image?.score}`}</Text>
              </Col>
              <Col span={2} />
              <Col span={11}>{image?.description}</Col>
            </Row>
          </div>
        </Modal>
      </React.Fragment>
    )
  }

  return null
}

export default ImagesList
