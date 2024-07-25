const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Use __dirname to get the current directory
const uploadDir = path.join(__dirname, '../uploads');
router.use('/uploads', express.static(uploadDir));

// Create the uploads folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    res.status(400).json({ message: 'Allowed filetypes are jpg, jpeg, png' });
  }
};

const upload = multer({
  storage: storage,
  
  fileFilter: fileFilter,
});

router.post('/addproduct', upload.single('file'), (req, res) => {
  res.status(200).json({ fileName: req.file.filename });
});

const downloadFile = (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(uploadDir, fileName);

  res.download(filePath, (error) => {
    if (error) {
      res.status(400).json({ message: 'Cannot download file' });
    }
  });
};

router.get('/files/:filename', downloadFile);



router.get('/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading files' });
    }

    if (files.length === 0) {
      return res.status(200).json({ files: [] });
    }

    res.status(200).json({ files });
  });
});

module.exports = router;
