const passwordSeed = process.env.REACT_APP_PASSWORD_SEED

export function getPasswordHash(password) {
    var crypto = require('crypto');
    var hash = crypto.createHash('sha256');
    let data = hash.update(`${passwordSeed}${password}`, 'utf-8');
    let password_hash = data.digest('hex');
    return password_hash
}