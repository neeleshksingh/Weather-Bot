const express = require('express');
const { blockUser, updateSettings } = require('../controllers/admin.contoller'); 
const { getAll } = require('../utils/crudUtils');
const verifyToken = require('../middleware/auth.middleware');
const router = express.Router();

router.get('/users', verifyToken, getAll(require('../models/user.model')));
router.put('/users/:telegramId/block', verifyToken, blockUser);
router.put('/settings', verifyToken, updateSettings);
module.exports = router;