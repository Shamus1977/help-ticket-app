const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getMe} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

router.post("/", registerUser);

router.post("/login", loginUser);
//To protect add middleware we created in the middleware folder
//Add protection middleware as the second argument.
router.get("/me",protect,getMe);

module.exports = router;