const bcrypt = require('bcrypt');




const hash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, val) => {

            resolve(val)
        })
    })
}





module.exports = {
    hash
}