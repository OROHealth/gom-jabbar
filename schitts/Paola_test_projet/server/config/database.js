const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + process.env.DB_USER_PASS +'@cluster0.vn1mq.mongodb.net/Schitt_project',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("connected to MongoDB"))
    .catch((err) => console.log("failed to connect to MongoDB", err));