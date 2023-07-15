const express = require('express');
const { getAllUser, updateUser, addUser, delteUser } = require('../controllers/userController');
const router = express.Router();

router.get('/', getAllUser);
router.put('/:id',updateUser);
router.delete('/:id',delteUser);
router.post('/',addUser);


module.exports = router;
