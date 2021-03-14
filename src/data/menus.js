/**
 * 菜单
 * id - 唯一标识
 * name - 菜单名称
 * url - 路由
 * openWay - 打开方式，默认当前页面打开/new_tab 打开新窗口
 */

import config from 'src/config';
const { routePrefix } = config;

const menus = [
    {
        id: '1',
        name: 'example',
        url: ``,
        children: [{
            id: '12',
            name: 'menu1',
            url: `${routePrefix}/test`,
        }]
    }, {
        id: '2',
        name: 'menu2',
        url: `${routePrefix}/test1`
    }, {
        id: '3',
        name: 'menu3',
        url: `${routePrefix}/test2/2`
    }
];

export default menus;
