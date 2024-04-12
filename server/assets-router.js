const express = require("express");
const router = express.Router();

const handleRedirect = (req, res) => {
  const filePath = req.path;
  res.redirect(303, `http://localhost:3000/src${filePath}`);
};

const imageRegex = /\/.+\.(svg|png|jpg|jpeg)$/;
router.get(imageRegex, handleRedirect);

const videoRegex = /\/.+\.(mp4|mov|avi|flv)$/;
router.get(videoRegex, handleRedirect);

module.exports = router;
