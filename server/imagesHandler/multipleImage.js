const path = require('path')
const crypto = require('crypto')
const multer = require('multer')

const allowedExt = ['.png', '.jpg', '.jpeg']
const allowedMime = ['image/png', 'image/jpg', 'image/jpeg']

const storage = (folder) => multer.diskStorage({
  destination: `./uploads/${folder}`,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname || '').toLowerCase()
    if (!allowedExt.includes(ext)) {
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
    }
    return cb(null, Date.now() + '_' + crypto.randomBytes(8).toString('hex') + ext)
  }
})

const upload = (folder) => multer({
  storage: storage(folder),
    limits: { fileSize: 1024 * 1024 * 5, fieldNestingDepth: 5, fields: 20 },
  fileFilter: (req, file, cb) => {
    if (allowedMime.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}); 

module.exports = upload
