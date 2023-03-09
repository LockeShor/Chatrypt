const fs = require('fs')
const crypto = require('node:crypto')

aes_key = crypto.randomBytes(32)

//console.log(aes_key)

out = {}

for (i = 1;i< 4;i++){
    pub = fs.readFileSync(`./test_data/RSApub${i}.txt`)
    sec = fs.readFileSync(`./test_data/RSAsec${i}.txt`)
    encrypted_key = crypto.publicEncrypt(crypto.createPublicKey(pub), aes_key)
    decrypted = crypto.privateDecrypt(crypto.createPrivateKey(sec), encrypted_key)
    console.log(encrypted_key)
    console.log(decrypted.toString("ascii"))
    //THIS WORKS IDIOT IT WAS GENERATING A RANDOM KEY
}