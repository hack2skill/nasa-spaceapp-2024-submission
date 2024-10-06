const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());  // Enable CORS for all routes

const userRouter = require("./routes/user");

//middleware for parsing request bodies..
app.use(bodyParser.json());
app.use("/user",userRouter)

const PORT = process.env.PORT || 3000; // Use environment variable for port
app.listen(PORT,()=>
{
  console.log(`Server is running on port ${PORT}`);
});
