const mongoose = require('mongoose')
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please, enter a user name"]
    },

    email: {
      type: String,
      required: [true, "Please, enter an email"],
      unique: true
    },

    phone: {
      type: String
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false
    },

    token: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)

  next()
})

userSchema.methods.checkPassword = (candidate, hash) => {
  return bcrypt.compare(candidate, hash)
}

const User = mongoose.model('user', userSchema)

module.exports = User