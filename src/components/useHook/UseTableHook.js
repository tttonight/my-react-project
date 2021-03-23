import { useReducer } from 'react';
// import { defaultPageSize } from 'src/configs';

const tableReducer = (state, action) => {
    const [type, payload] = action;
    switch (type) {
        case 'setLoading':
            return { ...state, loading: true };
        case 'setSelectedRowKeys':
            return {
                ...state,
                selectedRowKeys: payload || []
            };
        case 'setSelectedRows':
            return {
                ...state,
                selectedRows: payload || []
            };
        case 'setTable':
            return {
                ...state,
                tableData: payload.data,
                loading: false,
                pagination: {
                    ...state.pagination,
                    total: payload.total
                }
            };
        case 'resetPagination':
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    current: 1
                }
            };
        case 'setPagination':
            return {
                ...state,
                pagination: payload
            };
        // 操作
        case 'setAction':
            return {
                ...state,
                action: payload.action,
                actionDetail: payload.actionDetail || {}
            }
        default: throw new Error();
    }
}

const initailValue = {
    loading: false,
    selectedRowKeys: [],
    selectedRows: [],
    tableData: [],
    pagination: {
        current: 1,
        pageSize: 5,
        total: 0
    },
    // 操作类型
    action: false,
    // 操作数据
    actionDetail: {}
}

export default (props) => {
    const [state, dispatch] = useReducer(tableReducer, initailValue);

    const pagination = {
        ...state.pagination,
        onChange: (current, pageSize) => {
            dispatch(['setPagination', {
                ...state.pagination,
                current,
                pageSize
            }]);
        },
        onShowSizeChange: (_, pageSize) => {
            dispatch(['setPagination', {
                ...state.pagination,
                pageSize,
                current: 1
            }]);

        }
    }

    const rowSelection = {
        selectedRowKeys: state.selectedRowKeys,
        fixed: true,
        onChange: (selectedRowKeys, selectedRows) => {
            dispatch(['setSelectedRowKeys', selectedRowKeys]);
            dispatch(['setSelectedRows', selectedRows]);
        }
    }

    return {
        ...state,
        dispatch,
        rowSelection,
        pagination
    }
}