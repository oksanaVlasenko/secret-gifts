const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, enter a user name"]
    },
    phone: {
      type: String,
      required: [true, "Please, enter a phone"]
    },
    email: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('user', userSchema)

module.exports = User