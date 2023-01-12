const mongoose  = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        //Relation between ticket and user documents
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            // Ref to let mongo know which object ID. 
            // Pass in documents Model type as a string.
            ref: "User"
        },
        ticket:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            // Ref to let mongo know which object ID. 
            // Pass in documents Model type as a string.
            ref: "Ticket"
        },
        text: {
            type: String,
            required: [true, "Please enter add some text."],
        },
        isStaff: {
            type: Boolean,
            default: false,
        },        
        staffId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Note", noteSchema);