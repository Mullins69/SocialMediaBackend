require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRouter")
const postRoute = require("./routes/postRouter")
const mongoose = require("mongoose");
mongoose.connect(process.env.DBURL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));

app.use(cors());
app.use(express.json());

app.set('port', process.env.port || 3000) 

app.get('/', (req, res, next) =>{
    res.send('<h1>Hello world<h1>');
})

app.use('/users', userRoute)
app.use('/posts', postRoute)

app.listen(app.get('port'), server =>{
    console.info(`Server listen on port ${app.get('port')}`);
})