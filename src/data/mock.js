import Mock from 'mockjs';


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
})