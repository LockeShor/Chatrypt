const fs = require('fs')
const crypto = require('node:crypto')

data_in = JSON.parse(fs.readFileSync("./io.txt").toString())
for (i = 1;i< 4;i++){
    pub = fs.readFileSync(`./test_data/RSApub${i}.txt`)
    sec = fs.readFileSync(`./test_data/RSAsec${i}.txt`)
    encrypted_key = data_in[pub.toString()]
    decrypted = crypto.privateDecrypt(crypto.createPrivateKey(sec), Buffer.from(encrypted_key))
    console.log(`${i} decrypted key:\t`, decrypted)
    IV = data_in["IV"]
    msg = data_in["message"]
    decipher = crypto.createDecipheriv("aes-256-cbc", decrypted, Buffer.from(IV));
    console.log(decipher.update(msg, "hex", "utf-8") + decipher.final("utf-8"))
}