const router = require('express').Router();
const {
  getUsers, getProfile, createUser, updateAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getProfile);
router.post('/users', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateAvatar);

module.exports = router;
