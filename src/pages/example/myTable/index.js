/**
 * 
 */
import React, { useEffect, useCallback } from 'react';
// import { Table } from 'antd';
import axios from 'axios';

import { ContainerBody, ETable } from 'src/components';

import UseTableHook from 'src/components/useHook/UseTableHook';

export default props => {
    const {
        loading,
        tableData,
        pagination,
        dispatch
    } = UseTableHook();

    const getData = useCallback(() => {
        dispatch(['setLoading', true]);
        axios.get('/project/myTable/getTable')
            .then(res => res.data)
            .then(json => {
                dispatch(['setTable', {
                    data: json.list || [],
                    total: json.total || 0
                }]);
            });
    }, [dispatch]);

    useEffect(() => {
        getData();
    }, [getData]);

    const columns1 = [
        {
            title: '姓名',
            key: '1',
            dataIndex: 'name',
            // width: 80,
            // fixedWidth: true
        }, {
            title: '地址',
            key: '2',
            dataIndex: 'address',
        },
        {
            title: '邮箱',
            key: '3',
            dataIndex: 'email'
        }
    ];

    const columns2 = [
        {
            title: '姓名',
            key: '1',
            dataIndex: 'name',
        }, {
            title: '地址',
            key: '2',
            dataIndex: 'address',
        }, {
            title: '邮箱',
            key: '3',
            dataIndex: 'email'
        }, {
            title: '描述',
            key: '4',
            dataIndex: 'cparagraph'
        }, {
            title: '地址2',
            key: '5',
            dataIndex: 'address',
        }, {
            title: '地址3',
            key: '6',
            dataIndex: 'address',
        }, {
            title: '地址4',
            key: '7',
            dataIndex: 'address',
        }, {
            title: '地址5',
            key: '8',
            dataIndex: 'address',
        }
    ];


    return (
        <ContainerBody>
            <h1>自适应表格列宽</h1>
            <ETable
                rowKey="id"
                loading={loading}
                dataSource={tableData}
                columns={columns1}
                pagination={pagination}
            />

            <ETable
                rowKey="id"
                loading={loading}
                dataSource={tableData}
                columns={columns2}
                pagination={pagination}
            />

            {/* <h1>原生antd组件的Table</h1>
            <Table
                rowKey="id"
                loading={loading}
                dataSource={tableData}
                columns={columns2}
                pagination={pagination}
            /> */}

        </ContainerBody>
    )
}