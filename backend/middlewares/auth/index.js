const { checkRegisterData } = require('./checkRegisterData')
const { checkLoginData } = require('./checkLoginData')
const { protect } = require('./protect');

module.exports = {
  checkRegisterData,
  checkLoginData,
  protect
}