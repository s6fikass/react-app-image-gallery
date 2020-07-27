import React, { useContext } from 'react'
import classes from './style.module.css'
import { Select, Checkbox, Typography } from 'antd'
import ImgurContext from '../../../../core/contexts/imgur/context'

const { Text } = Typography

const Filters: React.FC = () => {
  const { section, sort, window, showViral, actions } = useContext(ImgurContext)

  return (
    <div className={classes.filters}>
      <div className={classes.item}>
        <Text className={classes.text}>Section</Text>
        <Select
          className={classes.select}
          value={section}
          onChange={(value) => actions.setSection(value)}
        >
          <Select.Option value='hot'>Hot</Select.Option>
          <Select.Option value='top'>Top</Select.Option>
          <Select.Option value='user'>User</Select.Option>
        </Select>
      </div>
      <div className={classes.item}>
        <Text className={classes.text}>Sort</Text>
        <Select
          className={classes.select}
          value={sort}
          onChange={(value) => actions.setSort(value)}
        >
          <Select.Option value='viral'>Viral</Select.Option>
          <Select.Option value='top'>Top</Select.Option>
          <Select.Option value='time'>Time</Select.Option>
          {section === 'user' && (
            <Select.Option value='rising'>Rising</Select.Option>
          )}
        </Select>
      </div>
      <div className={classes.item}>
        <Text className={classes.text}>Window</Text>
        <Select
          disabled={section !== 'top'}
          className={classes.select}
          value={window}
          onChange={(value) => actions.setWindow(value)}
        >
          <Select.Option value='day'>Day</Select.Option>
          <Select.Option value='week'>Week</Select.Option>
          <Select.Option value='month'>Month</Select.Option>
          <Select.Option value='year'>Year</Select.Option>
          <Select.Option value='all'>All</Select.Option>
        </Select>
      </div>
      <div className={classes.smallItem}>
        <Checkbox
          disabled={section !== 'user'}
          className={classes.checkBox}
          checked={showViral}
          onChange={(e) => actions.setShowViral(e.target.checked)}
        >
          <Text className={classes.text}>ShowViral</Text>
        </Checkbox>
      </div>
    </div>
  )
}

export default Filters
