const express = require('express');
const router = express.Router();
const File = require('../models/file.model');

router.get('/', async (req, res) => {
  const files = await File.find().sort({ uploadedAt: -1 });
  res.render('home', { allFiles: files });
});

module.exports = router;
