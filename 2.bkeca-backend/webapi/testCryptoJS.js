const cryptoJS = require('crypto-js');

const str = "foobarstringfoobarstringfoobarstringfoobarstringfoobarstringfoobarstring";

const enced = cryptoJS.AES.encrypt(str, "passwordphraselong");

const stringed = enced.toString();

const deced = cryptoJS.AES.decrypt(stringed, "passwordphraselong");

console.log( deced.toString(cryptoJS.enc.Utf8))