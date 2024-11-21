const express = require('express');
const router = express.Router();
const Controller = require("./controller");


router.post('/login',Controller.login);
router.get('/login',Controller.login);

module.exports = router;