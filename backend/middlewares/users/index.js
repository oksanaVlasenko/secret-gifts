const { checkUpdateData } = require("./checkUpdateUser");
const { updateImage } = require('./updateImage');
const { deleteImage } = require('./updateImage');
const { updateCoverImage } = require('./updateImage')

module.exports = {
    checkUpdateData,
    updateImage,
    deleteImage,
    updateCoverImage
}