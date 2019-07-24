const express = require('express')
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateData
} = require('../controllers/users')
const {
  protect,
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword
} = require('../controllers/auth')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.patch('/reset-password/:token', resetPassword)
router.patch('/reset-password/:token', resetPassword)
router.patch('/update-password', protect, updatePassword)
router.patch('/update-data', protect, updateData)
router.delete('/delete', protect, deleteUser)

router
  .route('/')
  .get(getAllUsers)
  .post(createUser)

router
  .route('/:id')
  .get(getUser)
  .patch(updateUser)

module.exports = router
