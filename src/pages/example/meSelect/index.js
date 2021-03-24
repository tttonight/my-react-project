/**
 * 
 */
import React, { useEffect, useState } from 'react';
import { Select, Input } from 'antd';
import axios from 'axios';

import { ContainerBody, ETable } from 'src/components';
import { useSelectListHook, useSelecthostNameHooks } from 'src/components/useHook/useSelectListHook';

const { Option } = Select;

export default props => {
    const SELECT_STYLE = {
        width: 200,
        // marginRight: 16,
        display: 'block',
        marginBottom: 24
    }
    const [value, setValue] = useState('name');

    const {
        options,
        list,
    } = useSelecthostNameHooks({
        api: '/project/getSelectList',
        otherParam: {
            type: value
        }
    });

    const {
        options: ipOption,
        list: ipList,
    } = useSelecthostNameHooks({
        api: '/project/getSelectList2',
    });


    return (
        <ContainerBody>
            <h1>下拉框异步数据加载hook</h1>
            <p>每页20条，滚动到底部获取下一页20条数据</p>
            <Select
                value={value}
                style={SELECT_STYLE}
                onChange={val => setValue(val)}
            >
                <Option value="name">name</Option>
                <Option value="email">email</Option>
            </Select>

            <Select
                style={SELECT_STYLE}
                {...options}
                placeholder={value === 'name' ? '请选择名字' : '请选择邮箱'}
            >
                {list.map(({ key, value }, i) => <Option value={key} key={key}>{value}-{i}</Option>)}
            </Select>

            <Select
                style={SELECT_STYLE}
                {...ipOption}
                placeholder="请选择Ip"
            >
                {ipList.map(({ key, value }) => <Option value={key} key={key}>{value}</Option>)}
            </Select>
        </ContainerBody>
    )
}