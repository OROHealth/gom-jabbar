const express = require('express');
const cors = require('cors');
const app  = express();
const pool = require("./db/db");

app.use(cors());
app.use(express.json());

const port = 5050;
app.listen(port, (console.log(`Listening on port ${port}`)));

//routes
const caribouRouter = require("./routes/caribou");
const humanRouter = require("./routes/human");

//map routes
app.use("/api/caribou", caribouRouter);
app.use("/api/human",humanRouter);


//on uncaught exception, log error and exit process. 
process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message)
    console.error(err.stack)
    process.exit(1)
}); 








