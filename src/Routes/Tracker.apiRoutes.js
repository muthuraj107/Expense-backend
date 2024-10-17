const express = require("express");
const router = express.Router();
const expense = require("../Contorllers/expence.controller");
const users = require("../Contorllers/expense.user.controller");
const { verifyToken } = require("../middlewares/auth.middleware"); // Import your middleware

// Protected routes
router.get("/data/:userId", verifyToken, expense.data); // Protecting data route
router.delete("/delete/:id", verifyToken, expense.delete); // Protecting delete route
router.put("/put/:id", verifyToken, expense.update); // Protecting update route

// Public routes
router.post("/post", expense.create);
router.post("/user/post", users.create);
router.get("/user/data", users.data);
router.post("/user/login", users.login);

module.exports = router;
