const fs = require('fs')
const crypto = require('node:crypto')

IV = crypto.randomBytes(16)
aes_key = crypto.randomBytes(32)

console.log("unencrypted key:\t", aes_key)

out = {}
message = "Hello World!"

const cipher = crypto.createCipheriv("aes-256-cbc", aes_key, IV)

out["IV"] = IV
out["message"] = cipher.update(message, "utf-8", "hex") + cipher.final("hex")

for (i = 1;i< 4;i++){
    pub = fs.readFileSync(`./test_data/RSApub${i}.txt`)
    encrypted_key = crypto.publicEncrypt(crypto.createPublicKey(pub), aes_key)
    //console.log(encrypted_key)
    out[pub.toString()] = encrypted_key
}
fs.writeFileSync("./io.txt", JSON.stringify(out, null, 2))