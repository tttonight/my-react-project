/**
 * @fileoverview 通用表格
 * @param {string} hsaEmptyImg 是否有无数据图片，默认为：true
 * @param {string} emptyMessage 没数据时显示的内容，默认为：暂无数据记录
 * @param {object} columns
 * ***columns新增参数****
 * @param {boolean} fixedWidth 宽度固定，超出的宽度是否平均分配给改列，默认false
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ConfigProvider, Table } from 'antd';
import styled from 'styled-components';


export default props => {
    const {
        hsaEmptyImg = true,
        emptyMessage = '暂无数据记录',
        dataSource
    } = props;
    const [columns, setColumns] = useState([]);
    const [scroll, setScroll] = useState({});

    const tableRef = useRef(null);
    const columnMinWidth = useRef({});


    // 无数据显示
    const customizeRenderEmpty = () =>
        hsaEmptyImg ? (
            <div className="empty-content">
                <img src={require('src/assets/images/empty.svg')} alt="No Data" />
                <p >{emptyMessage}</p>
            </div>
        ) : emptyMessage;

    // 获取需要平均分配宽度的行数
    const getAverageNum = columns => {
        return columns.filter(item => !item.fixedWidth).length;
    };

    const getColumns = (columns, diff) => {
        return columns.map(item => {
            const column = { ...item, ellipsis: true, }
            if (item.fixedWidth) {
                return column;
            } else {
                return {
                    ...column,
                    width: (item.width || columnMinWidth.current[item.dataIndex] || 0) + diff
                };
            }
        });
    };

    const getColumnsAndScroll = ({ columns, scroll, rowSelection }) => {
        // const sdTable = document.getElementById(id || 'sdTable');
        const tableWidth = tableRef.current ? tableRef.current.offsetWidth : window.innerWidth;

        const scrollbarWith = 8;
        const anchorWidth = getAnchorWidth(columns) || 0;
        const averageNum = getAverageNum(columns);
        const rowKeysWidth = rowSelection ? 60 : 0;
        const scrollX = tableWidth - rowKeysWidth - scrollbarWith;
        let diff = 0;
        if (scrollX - anchorWidth > 0) {
            diff = Math.floor((scrollX - anchorWidth) / averageNum);
        }
        return {
            scroll: {
                x: scrollX + rowKeysWidth,
                y: scroll ? scroll.y : false
            },
            columns: getColumns(columns, diff)
        };
    };

    const getAnchorWidth = columns => {
        return columns.reduce((total, { title, dataIndex, width = 0 }) => {
            if (!width) {
                width = getColCharNum(dataIndex, title) * 12;
                columnMinWidth.current[dataIndex] = width;
            }
            return total + width;
        }, 0);
    };

    // 找到一列数据中字符数最多的，最多不超过40个字符
    const getColCharNum = (keyName, title) => {
        const list = dataSource.map(item => item[keyName]);
        return list.reduce((length, value) => {
            const curLength = Math.min(calcCharNum(value), 40);
            return Math.max(length, curLength);
        }, Math.min(calcCharNum(title), 40));
    }


    useEffect(() => {
        setTimeout(() => {
            const { scroll, columns } = getColumnsAndScroll(props);
            setColumns(columns);
            setScroll(scroll);
        });
    }, [props, dataSource, getColumnsAndScroll])

    const paginationProps = useMemo(() => {
        return props.pagination
            ? {
                ...props.pagination,
                showQuickJumper: true,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '50', '100', '200', '500'],
                showTotal: total => {
                    if (props.pagination) {
                        const page = Math.ceil(total / props.pagination.pageSize);
                        return `共${page}页/${total}条`;
                    }
                    return `共${total}条`;
                }
            }
            : false;
    }, [props.pagination]);

    return (
        <ConfigProvider renderEmpty={customizeRenderEmpty}>
            <div
                ref={tableRef}
            >
                <SDTableContent
                    {...props}
                    id="sdTable"
                    columns={columns}
                    scroll={scroll}

                    pagination={paginationProps}
                />
            </div>
        </ConfigProvider>
    )
}


/**
 * 获取value值的字宽
 */
export const calcCharNum = (value = '') => {
    if (!value || value === 'null') {
        return 0;
    }
    const cnLen = (value.toString().match(/[\u4e00-\u9fa5]/g) || []).length;
    const notCnLen = value.toString().length - cnLen;
    // 最小6字宽,最大20字宽. 1个中文 = 2个字母数字
    return Math.min(Math.max(cnLen * 1.7 + notCnLen, 6), 20);
};

const SDTableContent = styled(Table)`
     {
         &.ant-table-wrapper {
             .ant-table-thead tr th {
                padding: 0 10px;
                height: 32px;
                line-height: 32px;
                 font-weight: 600;
                 background-color: #EDF0F4;
             }
            .ant-table-tbody tr td {
                padding: 0 10px;
                height: 32px;
            }
    
            .ant-table-tbody {
                tr:nth-child(even) {
                    background-color: #f7f8f9;
                }
            }

            .empty-content {
                padding: 24px;
                text-align: center;

                &>img {
                    width: 50px;
                }
            }
         }
    }
`;
