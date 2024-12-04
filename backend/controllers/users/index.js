const { getUser } = require("./getUser");
const { updateUser } = require("./updateUser");
const { updateAvatar } = require('./updateAvatar')
const { getUserAvatar } = require('./getUserAvatar')

module.exports = {
  getUser,
  updateUser,
  updateAvatar,
  getUserAvatar
}