import { Layout, Menu, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { RouteNames } from '../routes';

export function Navbar() {
  const navigate = useNavigate()
  const { isAuth, user } = useTypedSelector(state => state.auth)
  const {logout} = useActions()

  const publicItems = [
    { label: 'Войти', key: '1', onClick: () => navigate(RouteNames.LOGIN) } 
  ];

  const privateItems = [
    { label: 'Выйти', key: '1', onClick: () => {navigate(RouteNames.LOGIN); logout()} },
    { label: 'Календарь', key: '2', onClick: () => navigate(RouteNames.EVENT) }
  ];



  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth
          ?
          <>
            <div style={{ color: 'white' }}>{user.username}</div>
            <Menu theme='dark' mode='horizontal' selectable={false} items={privateItems}/>
              {/* <Menu.Item
                onClick={() => logout()}
                key={1}
              >Выйти</Menu.Item> */}
          </>
          :
          <>
            <div style={{ color: 'white' }}>Гость</div>
            <Menu theme='dark' mode='horizontal' selectable={false} items={publicItems} />
          </>
        }
      </Row>
    </Layout.Header>
  );
}