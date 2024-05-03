const express = require("express");
const router = express.Router();

const {contactUs} = require("../controllers/Contactus");

router.post("/contact", contactUs);

module.exports = router;