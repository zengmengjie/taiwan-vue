let regex = {}

//参数验证
regex.required = function (rule, value, callback) {
    if (!value) {
        callback(new Error('不能为空'))
    }
    callback()
}

//参数验证
regex.password = function (rule, value, callback) {
    if (value) {
        let reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{6,20}$/
        if (!reg.test(value)) {
            callback(new Error('必须包含字母、数字、特称字符，至少6个字符，最多20个字符'))
        }
    }
    callback()
}

regex.money = function (rule, value, callback) {
    if (value) {
        let reg = /^\d+(\.\d+)?$/
        if (!reg.test(value)) {
            callback(new Error('请输入正确的金额'))
        }
    }
    callback()
}

regex.email = function (rule, value, callback) {
    if (value) {
        let reg = /^([0-9A-Za-z\-_\\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        if (!reg.test(value)) {
            callback(new Error('请输入正确的邮箱'))
        }
    }
    callback()
}

regex.number = function (rule, value, callback) {
    if (value) {
        let reg = /^([0-9]+?)+$/
        if (!reg.test(value)) {
            callback(new Error('只允许数字'))
        }
    }
    callback()
}

regex.alphaDash = function (rule, value, callback) {
    if (value) {
        let reg = /^([a-zA-Z0-9]+[_]?)+$/
        if (!reg.test(value)) {
            callback(new Error('只允许字母、数字和下划线'))
        }
    }
    callback()
}

regex.chsAlphaNum = function (rule, value, callback) {
    if (value) {
        let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/
        if (!reg.test(value)) {
            callback(new Error('只允许汉字、字母和数字'))
        }
    }
    callback()
}

export default regex
