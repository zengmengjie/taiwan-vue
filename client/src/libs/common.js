const common = {}

common.isMobile = function() {
    var userAgentInfo = navigator.userAgent
    var Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
    var agentinfo = null
    for (var i = 0; i < Agents.length; i++) {
        if (userAgentInfo.indexOf(Agents[i]) > 0) {
        agentinfo = userAgentInfo
        break
        }
    }
    if (agentinfo) {
        return true
    } else {
        return false
    }
}

common.getSpecKey = function(speclist) {
    let specKey = ''
    let _spec = []
    for (var index in speclist) {
        if (speclist[index]._select != '') {
            _spec.push(speclist[index]._select)
        }
    }

    if (_spec.length == speclist.length) {
        //升序排序
        _spec.sort(function (a, b) {
            return a - b
        })

        specKey = _spec.join('_')
    }
    return specKey
}

common.getSku = function(specKey, goodsSkus) {
    if (specKey != '') {
        var sku = goodsSkus.find((s) => s.spec_key == specKey)
        if (sku) {
            return sku
        }
    }
    return null
}


//1:买N送N
//2:满N减N
//3:阶梯优惠
common.calc = function (goodsProm, skus) {
    let total = 0
    let totalPrice = 0
    let maxPrice = 0
    skus.forEach(g => {
        total += g.number
        totalPrice += g.number * g.shop_price
        if (maxPrice < g.shop_price) {
            maxPrice = g.shop_price
        }
    })

    if (!goodsProm || goodsProm.length == 0) return totalPrice

    let prom = goodsProm['prom']
    let rules = goodsProm['promInfo']
    switch (prom['prom_type']) {
        case 1:
            // console.log('赠品不参与价格计算')
            break
        case 2:
            let maxPreferential = 0
            let constraints = 0
            for (var index = 0; index < rules.length; index++) {
                if (totalPrice > rules[index].constraints && constraints < rules[index].constraints) {
                    constraints = rules[index].constraints
                    maxPreferential = rules[index].reward * 1
                }
            }
            totalPrice -= maxPreferential
            break
        case 3:
            totalPrice = 0.0
            let max = 0
            for (var key = 0; key < rules.length; key++) {
                let maximum = rules[key].maximum > total ? total : rules[key].maximum
                if (rules[key].minimum < total) {
                    //1:折扣,2:数量满减,3:固定金额
                    switch (rules[key]['reward_type']) {
                        case 1:
                            totalPrice += maxPrice * (maximum - rules[key].minimum) * (rules[key]['reward'] * 1)
                            break
                        case 2:
                            totalPrice += (maxPrice - (rules[key]['reward'] * 1)) * (maximum - rules[key].minimum)
                            break
                        case 3:
                            totalPrice += (rules[key]['reward'] * 1) * (maximum - rules[key].minimum)
                            break
                        default:
                            break
                    }
                }
                max = max < maximum ? maximum : max
            }
            totalPrice += (total - max) * maxPrice
            break
        default:
            break
    }

    return totalPrice * 1
}

common.group = function(arr) {
    let map = {}
    let dest = []
    for (var i = 0; i < arr.length; i++) {
        var ai = arr[i]
        if (!map[ai.id]) {
            dest.push({
                id: ai.id,
                goods_name: ai.goods_name,
                shop_price: ai.shop_price,
                list: [ai]
            })
            map[ai.id] = ai
        } else {
            for (var j = 0; j < dest.length; j++) {
                var dj = dest[j]
                if (dj.id == ai.id) {
                    dj.list.push(ai)
                    break
                }
            }
        }
    }
    return dest
}

//页面钱币符号
common.dollar = function (locale) {
    switch (locale) {
        case 'TW':
            return 'NT$'
        default:
            return 'NT$'
    }
}
export default common
