const multer = require('multer');
const path = require('path');
const { AppError } = require('../../utils');

const pathDir =
	process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '../../', 'tmp');

const multerConfig = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, pathDir);
	},
	filename: (req, file, cb) => {
		const sanitizedFileName = file.originalname.normalize('NFC').replace(/[^a-zA-Z0-9.\-_]/g, '_');
		cb(null, sanitizedFileName);
	},
});

const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

const multerFilter = (req, file, cbk) => {
	const ext = path.extname(file.originalname).toLowerCase();

	if (file.mimetype.startsWith('image/') && validExtensions.includes(ext)) {
		cbk(null, true);
	} else {
		cbk(new AppError(400, 'Please, upload valid image files!'), false);
	}
};

const uploadTmp = multer({
	storage: multerConfig,
	fileFilter: multerFilter,
});

module.exports = {
	uploadTmp,
};