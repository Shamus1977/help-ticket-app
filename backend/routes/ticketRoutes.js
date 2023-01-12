const express = require("express");
//need auth middleware to protect routes
const {protect} = require("../middleware/authMiddleware");
//Import controller functions
const {getTickets, createTicket, getTicket, deleteTicket, updateTicket} = require("../controllers/ticketController");

const router = express.Router();
//Merge with notes route and
//re-route into note router
const noteRouter = require("./noteRoutes");
router.use("/:ticketId/notes", noteRouter);
//Routes also have to be disclosed in server.js
router.route("/").get(protect,getTickets).post(protect, createTicket);

router.route("/:id").get(protect, getTicket).delete(protect,deleteTicket).put(protect, updateTicket);

//Ticket controller holds the methods called in these routes.

module.exports = router;