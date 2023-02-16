import { Button, Form, Input } from 'antd';
import React, { useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { rules } from '../utils/rules';

export function LoginForm() {
  const { isLoading, error } = useTypedSelector(state => state.auth)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useActions()

  const submitHandler = () => {
    login(username, password)
  }

  return (
    <Form
      onFinish={submitHandler}
    >
      {error &&
        <div style={{ color: 'red' }}>
          {error}
        </div>}
      <Form.Item
        label='Username'
        name='username'
        rules={[rules.required('Please input your username')]}
      >
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label='Password'
        name='password'
        rules={[rules.required('Please input your password')]}
      >
        <Input
          type={'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Button type='primary' htmlType='submit' loading={isLoading}>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
}