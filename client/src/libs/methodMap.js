/**
 * Created by lynnnnnnnn on 2017/8/15.
 */
const methodMap = {
    /** 登陆接口 **/
    Adv: {url: '/api/v1/adv', method: 'get'},
    Site: {url: '/api/v1/site', method: 'get'},
    GoodsList: {url: '/api/v1/goods/list', method: 'get'},
    GoodsAll: {url: '/api/v1/goods/all', method: 'get'},
    GoodsInfo: {url: '/api/v1/goods/info', method: 'get'},
    Product: {url: '/api/v1/product', method: 'post'},
    OrderSearch: {url: '/api/v1/order/search', method: 'get'},
    OrderSubmit: {url: '/api/v1/order/submit', method: 'post'},
    Comment: {url: '/api/v1/comment', method: 'post'}
}

export default methodMap
