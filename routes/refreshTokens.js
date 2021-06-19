const express = require("express");
const router = express.Router();

/**
 * call users handler
 */
const refreshTokenHandler = require("./handler/refreshTokens");

router.post("/", refreshTokenHandler.create);
router.get("/", refreshTokenHandler.getToken);

module.exports = router;
