const { login } = require('./login')
const { register } = require('./register')
const { changePassword } = require('./changePassword')

module.exports = {
  register,
  login,
  changePassword
}