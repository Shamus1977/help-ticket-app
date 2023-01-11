const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const colors = require("colors");
const PORT = process.env.PORT || 5000;
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");

//Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res) => {
    res.status(200).json({message:"Welcome to the Support Desk API"});
});

//Routes imported from route files in routes folder.
app.use(`/api/users`, require("./routes/userRoutes"));
app.use('/api/tickets', require("./routes/ticketRoutes"));

//Error handliing
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));