import crypto from 'crypto-js'

let keyStr = 'EFU5FQ2341V65SAS'
let dh = {

}

dh.encrypt = function(value) {
    let key = crypto.enc.Utf8.parse(keyStr)
    let encryptedData = crypto.AES.encrypt(value, key, {
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
    })
    var encryptedStr = encryptedData.ciphertext.toString()
    return encryptedStr
}

dh.decrypt = function(value) {
    let key = crypto.enc.Utf8.parse(keyStr)
    var encryptedHexStr = crypto.enc.Hex.parse(value)
    var encryptedBase64Str = crypto.enc.Base64.stringify(encryptedHexStr)
    var decryptedData = crypto.AES.decrypt(encryptedBase64Str, key, {
        mode: crypto.mode.ECB,
        padding: crypto.pad.Pkcs7
    })
    var decryptedStr = decryptedData.toString(crypto.enc.Utf8)
    return decryptedStr
}

export default dh
