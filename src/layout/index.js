import React from 'react';
import { Layout, Menu } from 'antd';
import { Routes } from 'src/cube/router';
import './index.scss';

const { Header, Content } = Layout;
export default props => {
    return (
        <Layout className="app-layout">
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1">menu1</Menu.Item>
                    <Menu.Item key="2">menu2</Menu.Item>
                    <Menu.Item key="3">menu3</Menu.Item>
                </Menu>
            </Header>

            <Content className="main-content">
                <div className="sub-main-content">
                    <Routes routes={props.routes} />
                </div>
            </Content>
        </Layout>
    )
}