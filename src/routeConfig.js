import React from 'react';
// 布局组件
import Layout from './layout';

import config from './config';

import Test from './pages/test';
// example
import MyTable from './pages/example/myTable';
import MySelect from './pages/example/meSelect';

const { routePrefix } = config;

const NotFound = () => <h1>Not Found</h1>;

export const routeConfig = [
    {
        tag: 'Redirect',
        from: '/',
        to: `${routePrefix}/test`,
        exact: true,
    },
    {
        name: 'test',
        tag: 'Route',
        path: `${routePrefix}/login`,
        component: Test
    }, {
        tag: 'Route',
        component: Layout,
        routes: [
            {
                name: 'test',
                tag: 'Route',
                path: `${routePrefix}/test`,
                component: Test,
                exact: true,
            },
            {
                name: 'myTable',
                tag: 'Route',
                path: `${routePrefix}/example/myTable`,
                component: MyTable,
                exact: true,
            },
            {
                name: 'MySelect',
                tag: 'Route',
                path: `${routePrefix}/example/mySelect`,
                component: MySelect,
                exact: true,
            },
            {
                tag: 'Route',
                component: NotFound
            }
        ]
    }
];