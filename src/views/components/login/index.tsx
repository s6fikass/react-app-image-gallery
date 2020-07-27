import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Typography, Card, Form, Input, Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import classes from './style.module.css'
import AuthContext from '../../../core/contexts/auth/context'

const { Title, Text } = Typography

const Login: React.FC = () => {
  const { t } = useTranslation()
  const { push } = useHistory()
  const {
    loading,
    actions: { login },
  } = useContext(AuthContext)

  const [form] = Form.useForm()

  const handleFormSubmit = (values: any) => {
    login(values)
  }

  return (
    <Card className={classes.card} bordered={false}>
      <Title level={3} className={classes.title}>
        {t('welcomeBack')}
      </Title>
      <Text className={classes.subtitle}>{t('welcomeBackExtra')}</Text>
      <Form
        hideRequiredMark
        form={form}
        layout='vertical'
        onFinish={handleFormSubmit}
        className={classes.form}
        scrollToFirstError
        validateMessages={{
          required: t('requiredRuleMsg'),
          types: { email: t('emailRuleMsg') },
        }}>
        <Form.Item
          
          name='username'
          label={<Text className={classes.formLabel}>{t('email')}</Text>}
          rules={[
            {
              type: 'email',
            },
            {
              required: true,
            },
          ]}>
          <Input
            className={classes.input}
            prefix={
              <FontAwesomeIcon
                icon={faEnvelope}
                className={classes.prefixIcon}
              />
            }
            placeholder='name@example.com'
          />
        </Form.Item>
        <Form.Item
          name='password'
          label={<Text className={classes.formLabel}>{t('password')}</Text>}
          rules={[
            {
              required: true,
            },
            {
              min: 8,
              message: t('min8RuleMsg'),
            },
          ]}>
          <Input.Password
            className={classes.input}
            prefix={
              <FontAwesomeIcon icon={faLock} className={classes.prefixIcon} />
            }
            placeholder='********'
          />
        </Form.Item>
        <Button
          type='link'
          className={classes.linkButton}
          onClick={() => push('/auth/forget-password')}>
          {t('forgotYourPassword')}
        </Button>
        <Form.Item className={classes.footer}>
          <Button
            type='primary'
            size='large'
            htmlType='submit'
            className={classes.button}
            loading={loading}>
            {t('login')}
          </Button>
        </Form.Item>
        <span>
          <Text>{t('dontHaveAccount')}</Text>
          <Button
            type='link'
            className={classes.linkButton}
            onClick={() => push('/auth/register')}>
            {t('createOne')}
          </Button>
        </span>
      </Form>
    </Card>
  )
}

export default Login
