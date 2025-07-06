const express = require("express");
const { SignUp, SignIn, google, signOut } = require("../controllers/auth.controller");
const router = express.Router();

router.post('/signUp', SignUp);
router.post('/login', SignIn);
router.post('/google', google);
router.get('/signout', signOut);

module.exports = router;