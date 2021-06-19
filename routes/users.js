const express = require("express");
const router = express.Router();

/**
 * call users handler
 */
const usersHandler = require("./handler/users");

/**
 * Post route for register
 */
router.post("/register", usersHandler.register);
router.post("/login", usersHandler.login);
router.post("/logout", usersHandler.logout);
router.put("/:id", usersHandler.update);
router.get("/:id", usersHandler.getUser);
router.get("/", usersHandler.getUsers);

module.exports = router;
