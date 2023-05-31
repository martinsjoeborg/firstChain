const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/', controller.getChain);
router.post('/', controller.createBlock);

module.exports = router;