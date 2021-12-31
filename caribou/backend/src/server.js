const express = require('express');
const cors = require('cors');
const session = require("express-session");
const { Server } = require("socket.io");
const app  = express();
const pool = require("./db/db");
const server = require("http").createServer(app);
require("dotenv").config();

app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
app.use(express.json());
app.use(session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure: false,
        httpOnly: true,
        sameSite: "lax",
    }
}))

const frontend = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: "true",
    },
});


const port = 5050;
app.listen(port, (console.log(`Listening on port ${port}`)));

//routes
const caribouRouter = require("./routes/caribou");
const humanRouter = require("./routes/human");
const inboxRouter = require("./routes/inbox");
const messageRouter = require("./routes/message");

//map routes
app.use("/api/caribou", caribouRouter);
app.use("/api/human",humanRouter);
app.use("/api/message",messageRouter);
app.use("/api/inbox",inboxRouter);


//on uncaught exception, log error and exit process. 
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
}); 








