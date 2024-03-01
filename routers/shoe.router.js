const express = require('express');
const router = express.Router();

const cloudinary = require('../configs/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Shoe',
  allowedFormats: ['jpg', 'png', 'jpeg'],
});
const upload = multer({
  storage: storage,
});

const {
  getShoes,
  createShoe,
  deleteShoe,
  updateShoe,
  getShoeById,
} = require('../controllers/shoe.controller');

router
  .route('/')
  .get(getShoes)
  .post(upload.fields([{ name: 'img', maxCount: 1 }]), createShoe);

router
  .route('/:id')
  .get(getShoeById)
  .delete(deleteShoe)
  .patch(upload.fields([{ name: 'img', maxCount: 1 }]), updateShoe);

module.exports = router;
