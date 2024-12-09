const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  id: {
    type: String, // Унікальний ідентифікатор для фото, наприклад, від Cloudinary
    required: true,
  },
  src: {
    type: String, // URL до фото
    required: true,
  },
});

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    price: {
      type: Number
    },
    currency: {
      type: String
    },
    description: {
      type: String
    },
    images: {
      type: [imageSchema], 
      default: [],
    },
    url: {
      type: String
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    selected: {
      type: Boolean,
      default: false
    }
  }
)

const Product = mongoose.model('product', productSchema)

module.exports = Product