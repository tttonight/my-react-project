import React from 'react';
import { Layout } from 'antd';
import { Routes } from 'src/cube/router';



import HorizontalMenu from './components/HorizontalMenu';
import UserInfo from './components/UserInfo';

import menus from 'src/data/menus';

import './index.scss';

const { Header, Content, Sider } = Layout;

export default props => {
    return (
        <Layout className="app-layout">
            <Sider width={200}>
                <div className="logo" >LOGO</div>
                <HorizontalMenu
                    menus={menus}
                    location={props.location}
                />
            </Sider >

            <Layout className="site-layout">
                <Header className="header-content" >
                    <UserInfo />
                </Header>

                {/* <Breadcrumb>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb> */}

                <Content className="main-content">
                    <div className="sub-main-content">
                        <Routes routes={props.routes} />
                    </div>
                </Content>
            </Layout>
        </Layout>
    )
}