const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true
    }
  }
)

const Category = mongoose.model('category', categorySchema)

module.exports = Category