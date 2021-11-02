//Name of the file : sha256-hash.js
//Loading the crypto module in node.js
var crypto = require('crypto');
//creating hash object 
var hash = crypto.createHash('sha256');
//passing the data to be hashed
data = hash.update('password', 'utf-8');
//Creating the hash in the required format
gen_hash = data.digest('hex');
//Printing the output on the console
console.log("hash : " + gen_hash);


var verifyHash = crypto.createHash('sha256')
verifyData = verifyHash.update('password', 'utf-8');
verify_gen_hash = verifyData.digest('hex');

console.log("verify hash : " + verify_gen_hash);