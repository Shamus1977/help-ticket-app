// asyncHandler handles exceptions inside of express
//routes and passes them to the next middleware
//such as an Error object. It handles cross-cutting
//concerns in this manner. Reduces need for a try catch here.
const asyncHandler = require("express-async-handler");

//Get the models
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc Get user tickets
// @route GET /api/tickets
// @access Private
// const getTickets = asyncHandler(async (req, res) => {
//     //Get tickets using the UserID in the JWT
//     //The user is set in the req with the authMiddleware we created
//     const user = await User.findById(req.user.id);
//     if(!user) {
//         res.status(401);
//         throw new Erorr("User not found");
//     }
//     const tickets = await Ticket.find({user: req.user.id});
//     res.status(200).json(tickets);
// });

// @desc Get notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(401);
        throw new Erorr("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized.");
    }

    const notes = await Note.find({ticket: req.params.ticketId});
    res.status(200).json(notes);
});

// @desc Create a ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async (req, res) => {
    
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(401);
        throw new Erorr("User not found");
    }

    const ticket = await Ticket.findById(req.params.ticketId);

    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error("User not authorized.");
    }

    const note = await Note.create({
        ticket: req.params.ticketId,
        isStaff:false,
        text: req.body.text,
        user:req.user.id,
    });
    res.status(200).json(note);
});
// @desc Update ticket
// @route PUT /api/tickets/:id
// @access Private
// const updateTicket = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user.id);
//     if(!user) {
//         res.status(401);
//         throw new Erorr("User not found");
//     }
//     const ticket = await Ticket.findById(req.params.id);

//     if(!ticket){
//         res.status(404);
//         throw new Error("Ticket not found.");
//     }

//     if(ticket.user.toString() !== req.user.id){
//         res.status(401);
//         throw new Error("Not Authorized.");
//     }

//     const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, 
//         req.body, {new: true});
//     res.status(200).json(updatedTicket);
// });

// @desc Delete user ticket
// @route DELETE /api/tickets/:id
// @access Private
// const deleteTicket = asyncHandler(async (req, res) => {
    
//     const user = await User.findById(req.user.id);
//     if(!user) {
//         res.status(401);
//         throw new Erorr("User not found");
//     }
//     const ticket = await Ticket.findById(req.params.id);

//     if(!ticket){
//         res.status(404);
//         throw new Error("Ticket not found.");
//     }

//     if(ticket.user.toString() !== req.user.id){
//         res.status(401);
//         throw new Error("Not Authorized.");
//     }
//     let ticketId = ticket._id;
//     await ticket.remove();
//     res.status(200).json({success:`Ticket with Id of ${ticketId} Deleted.`});
// });

module.exports = {
    getNotes,
    addNote,
}