const express = require("express");
//need auth middleware to protect routes
const {protect} = require("../middleware/authMiddleware");
//Import controller functions
const {getNotes, addNote} = require("../controllers/noteController");

//Options passed into router so that ticket router could be used with it.
const router = express.Router({mergeParams:true});
//Routes also have to be disclosed in server.js
router.route("/").get(protect,getNotes).post(protect,addNote);

// router.route("/:id").get(protect, getTicket).delete(protect,deleteTicket).put(protect, updateTicket);

//Ticket controller holds the methods called in these routes.

module.exports = router;