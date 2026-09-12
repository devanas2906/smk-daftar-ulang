const multer = require('multer');
const storage = multer.memoryStorage();

const validationFileType = (_, file, cb) => {
  const allowedFileType = 'application/pdf';
  if (file.mimetype !== allowedFileType) return cb(new Error("File harus berupa PDF"), false);
  cb(null, true);
};

const uploadPdf = multer({
  storage,
  fileFilter: validationFileType,
  limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = uploadPdf;
