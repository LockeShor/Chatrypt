const fs = require('fs')
const crypto = require('node:crypto')

IV = crypto.randomBytes(16)
aes_key = crypto.randomBytes(32)

console.log("unencrypted key:\t", aes_key)

out = {}
message = "123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZqwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
//BUG ^^ Truncates to multiple of 16 bytes, fix by adding 16 extra bytes to add to a multiple of 16???
const cipher = crypto.createCipheriv("aes-256-cbc", aes_key, IV)
//TODO: encrypt IV?
out["IV"] = IV
out["message"] = cipher.update(message, "utf-8", "hex")

for (i = 1;i< 4;i++){
    pub = fs.readFileSync(`./test_data/RSApub${i}.txt`)
    //sec = fs.readFileSync(`./test_data/RSAsec${i}.txt`)
    encrypted_key = crypto.publicEncrypt(crypto.createPublicKey(pub), aes_key)
    //decrypted = crypto.privateDecrypt(crypto.createPrivateKey(sec), encrypted_key)
    //console.log(`${i} decrypted key:\t`, decrypted)
    //console.log(encrypted_key)
    out[pub.toString()] = encrypted_key
    //console.log(encrypted_key.toString())
}
//console.log(out)
fs.writeFileSync("./io.txt", JSON.stringify(out, null, 2))