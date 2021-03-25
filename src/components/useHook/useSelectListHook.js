/**
 * 下拉hooks 
 */
import { useReducer, useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

const initState = {
    list: [],
    pagination: {
        current: 1,
        pageSize: 20,
        total: 0
    },
    searchValue: undefined
}

const reducer = (state, action) => {
    const [type, data] = action;
    switch (type) {
        case 'setList': {
            return {
                ...state,
                list: data.list || [],
                pagination: {
                    ...state.pagination,
                    total: data.total
                }
            }
        }
        case 'setSearch': {
            return {
                ...state,
                searchValue: data || undefined
            }
        }
        case 'resetList': {
            return {
                ...state,
                list: [],
                pagination: {
                    ...state.pagination,
                    current: 1,
                    total: 0
                }
            }
        }
        case 'reset': {
            return initState;
        }
        case 'setPagination': {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    ...data
                },
            };
        }
        default: return state;
    }
}

/**
 * 公共下拉hooks
 */
export const useSelectListHook = () => {
    const [state, dispatch] = useReducer(reducer, initState);

    const { list, pagination, searchValue } = state;

    // 滚动
    const onPopupScroll = (e) => {
        e.persist();
        const { target } = e;
        const { current, pageSize, total } = pagination;
        if (current * pageSize > total) {
            return;
        };

        if (target.scrollTop + target.offsetHeight + 20 >= target.scrollHeight) {
            dispatch(['setPagination', {
                current: pagination.current + 1
            }]);
        }
    }

    // 下拉框的显示和隐藏
    const onDropdownVisibleChange = (open) => {
        if (!open) {
            if (pagination.current !== 1 || searchValue) {
                dispatch(['reset']);
            }

        }
    }

    // 查询
    const onSearch = (value) => {
        dispatch(['setSearch', value]);
        dispatch(['resetList']);
    }

    const onSelect = value => {

        if (value && searchValue !== undefined) {
            dispatch(['reset']);
        }
    };

    return {
        list,
        pagination,
        searchValue,
        options: {
            onPopupScroll,
            onDropdownVisibleChange,
            onSearch: _.debounce(onSearch, 800),
            onSelect,
            showSearch: true,
            allowClear: true,
            filterOption: false
        },
        setList: (params) => dispatch(['setList', params])
    }
}

/**
 * 下拉
 * @param {*} api 下拉接口，返回的格式
 * {
 *      success: true,
 *      list:[],
 *      total: 0
 * }
 * @param {object} otherParam 其他参数,用于做联动
 */
export const useSelecthostNameHooks = ({ api, otherParam = {} }) => {

    const {
        options,
        list,
        pagination,
        searchValue,
        setList,
    } = useSelectListHook();
    const [newParams, setNewParams] = useState(otherParam);
    // const [isfetch, setIsFetch] = useState(isFirstFetch);

    useEffect(() => {

        // 获取网管名称
        const getList = () => {
            axios.post(api, {
                data: {
                    searchValue,
                    ...newParams
                },
                pageNum: pagination.current,
                pageSize: pagination.pageSize,
            })
                .then(res => res.data)
                .then(json => {
                    if (json.success) {
                        let data = json.list || [];
                        setList({
                            list: pagination.current === 1 ?
                                _.uniq(data) : _.uniq(list.concat(data)),
                            total: json.total || 0
                        })
                    }
                })
                .catch(err => console.error(err))
        }

        if (api) {
            getList();
        }


    }, [api, pagination.current, pagination.pageSize, searchValue, newParams]);


    useEffect(() => {
        setNewParams(otherParam);
    }, [JSON.stringify(otherParam)]);

    return {
        options,
        list,
    }
}

