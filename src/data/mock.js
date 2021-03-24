import Mock from 'mockjs';

// 获取表格数据
Mock.mock('/project/myTable/getTable', 'get', () => {
    return Mock.mock({
        'list|5': [{
            id: '@id', // 用@来获取id
            name: '@cname',
            email: '@email',
            cparagraph: '@cparagraph',
            address: '@city(true)'
        }],
        total: 15
    })
});

// 获取下拉接口数据
Mock.mock('/project/getSelectList', 'post', (request) => {

    const params = JSON.parse(request.body);
    let list = [];
    if (params.data.type === 'name') {
        list = Mock.mock({
            'list|20': [{
                key: '@id',
                value: '@cname',
            }]
        })
    } else {
        list = Mock.mock({
            'list|20': [{
                key: '@id',
                value: '@email',
            }]
        })
    }

    return {
        list: list.list,
        total: 300,
        success: true
    }
});

// 获取下拉接口数据
Mock.mock('/project/getSelectList2', 'post', () => {
    return Mock.mock({
        'list|20': [{
            key: '@id',
            value: '@ip',
        }],
        total: 500,
        success: true
    })
});