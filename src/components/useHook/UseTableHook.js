import { useState } from 'react';
// import { defaultPageSize, tableExpcetHeight } from 'src/configs';

export default (topRef) => {
    const [loading, setLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        onChange: (current) => {
            setPagination(pagination => ({
                ...pagination,
                current
            }));
        },
        onShowSizeChange: (current, pageSize) => {
            setPagination(pagination => ({
                ...pagination,
                pageSize,
                current: 1
            }));
        }
    });



    const rowSelection = {
        selectedRowKeys,
        fixed: true,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSelectedRows(selectedRows);
        }
    }


    return {
        pagination,
        setPagination,
        loading,
        setLoading,
        selectedRowKeys,
        setSelectedRowKeys,
        selectedRows,
        setSelectedRows,
        rowSelection,
    };
}