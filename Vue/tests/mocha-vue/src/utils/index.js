export function uniquelize(arr) {
    var tmp = {}
    var ret = []
    for (var i = 0, j = arr.length; i < j; i++) {
        if (!tmp[arr[i]]) {
        tmp[arr[i]] = 1
        ret.push(arr[i])
        }
    }
    return ret
}

/**
 * 金钱验证  第一位不能为0，两位小数
 * @param {string} money
 * @returns {Boolean}
 */
export function validMoney(money) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    return reg.test(money)
}