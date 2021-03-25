/**
 * 菜单
 */
import React, { useEffect, useRef, useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { pathToRegexp } from 'path-to-regexp';

import { routeConfig } from 'src/routeConfig';

const { SubMenu, Item: MenuItem } = Menu;

const flattenMenus = (menu, pKey = '') => {
    let menuConfig = [];
    menu.forEach(item => {
        menuConfig = menuConfig.concat({ ...item, pKey });
        if (item.children && item.children.length) {
            menuConfig = menuConfig.concat(flattenMenus(item.children, item.id))
        }
    })
    return menuConfig;
}

const getRoutes = (routeConfig) => {
    let routes = [];
    routeConfig.forEach(item => {
        if (item.tag === 'Route' && item.path) {
            routes = routes.concat(item.path);
        }

        if (item.routes) {
            routes = routes.concat(getRoutes(item.routes))
        }
    })
    return routes;
}

export default props => {
    const { menus } = props;
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);

    const flattenedMenu = useRef(flattenMenus(menus));

    useEffect(() => {
        const { pathname } = props.location;


        const getSelectKeys = (menuConfig = [], routers = [], pathname = '') => {
            let selectedKeys = [];
            // 精准匹配
            routers.forEach(path => {
                const pathRegexp = pathToRegexp(path);
                if (pathRegexp.test(pathname)) {

                    menuConfig.forEach(item => {
                        if (pathRegexp.test(item.url)) {
                            selectedKeys.push(item.id);
                        };
                    });
                }
            });

            // 如果精准匹配不到，则路由地址可能属于某个页面的子页面
            if (selectedKeys.length === 0) {
                const pathnameArr = pathname.split('/');
                if (pathnameArr.length > 1) {
                    const nextPathName = pathnameArr.slice(0, pathnameArr.length - 1).join('/');
                    selectedKeys = [...getSelectKeys(menuConfig, routers, nextPathName)]
                }
            }

            return selectedKeys;
        }

        const routers = getRoutes(routeConfig);
        const selectedKeys = getSelectKeys(flattenedMenu.current, routers, pathname);

        const selectedData = flattenedMenu.current.find(item => item.id === selectedKeys[0]);
        if (selectedData) {
            setOpenKeys(selectedData.pKey);
        }
        setSelectedKeys(selectedKeys);
    }, [props])

    const getLinkProps = ({ openWay = '', url }) => {
        let linkProps = {
            to: url
        }
        if (openWay === 'new_tab') {
            linkProps = {
                ...linkProps,
                target: '_blank'
            }
        }

        return linkProps;
    }

    const renderMenuItem = (menus) => {
        return menus.map(menu => {
            if (menu.children && menu.children.length) {
                return (
                    <SubMenu key={menu.id} title={menu.name}>
                        {renderMenuItem(menu.children)}
                    </SubMenu>
                )
            }

            return (
                <MenuItem key={menu.id}>
                    <Link {...getLinkProps(menu)}>{menu.name}</Link>
                </MenuItem>
            )
        })
    }


    return (
        <Menu
            theme="dark"
            mode="inline"
            // mode="horizontal"
            // defaultSelectedKeys={['2']}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
        >
            {renderMenuItem(menus)}
        </Menu>
    )
}