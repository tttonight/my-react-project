// 布局组件
import Layout from './layout';

import config from './config';

import Test from './pages/test';
const { routePrefix } = config;

export const routeConfig = [
    {
        name: 'test',
        tag: 'Route',
        path: `${routePrefix}/login`,
        component: Test
    }, {
        tag: 'Route',
        component: Layout,
        routes: [{
            name: 'test',
            tag: 'Route',
            path: `${routePrefix}/test`,
            component: Test
        }]
    }
];