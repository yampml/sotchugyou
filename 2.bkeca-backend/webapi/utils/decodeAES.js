const cryptoJS = require('crypto-js');

exports.decodeAES = (encodedString, passphrase) => cryptoJS.AES.decrypt(encodedString, passphrase).toString(cryptoJS.enc.Utf8);
