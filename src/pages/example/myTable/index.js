/**
 * 
 */
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

import { ContainerBody, ETable } from 'src/components';

import UseTableHookWithReducer from 'src/components/useHook/UseTableHookWithReducer';

export default props => {
    const {
        loading,
        tableData,
        pagination,
        dispatch
    } = UseTableHookWithReducer();

    const getData = useCallback(() => {
        dispatch(['setLoading', true]);
        axios.get('/project/myTable/getTable')
            .then(res => res.data)
            .then(json => {
                dispatch(['setTable', {
                    data: json.list,
                    total: json.total
                }])
            });
    }, [pagination.current, pagination.pageSize]);

    useEffect(() => {
        getData();
    }, [getData])

    const columns = [
        {
            title: '标题1',
            key: '1',
            dataIndex: 'name',
        }, {
            title: '标题',
            key: '2',
            dataIndex: 'address',
        },
        {
            title: '标题',
            key: '3',
            dataIndex: 'name'
        }, {
            title: '标题4',
            key: '4',
            dataIndex: 'name',
            width: 100,
        },
        {
            title: '标题',
            key: '5',
            dataIndex: 'name',
        }, {
            title: '标题啊啊',
            key: '6',
            dataIndex: 'name'
        }, {
            title: '标题777',
            key: '7',
            dataIndex: 'name'
        }, {
            title: '标题777',
            key: '7',
            dataIndex: 'name'
        }, {
            title: '标题888',
            key: '8',
            dataIndex: 'size'
        }, {
            title: '标题888',
            key: '9',
            dataIndex: 'size'
        }, {
            title: '标题888',
            key: '10',
            dataIndex: 'size'
        }, {
            title: '标题888',
            key: '11',
            dataIndex: 'size'
        }, {
            title: '标题888',
            key: '12',
            dataIndex: 'title'
        }
    ];

    return (
        <ContainerBody>
            <ETable
                rowKey="id"
                loading={loading}
                dataSource={tableData}
                columns={columns}
                pagination={pagination}
            />
        </ContainerBody>
    )
}