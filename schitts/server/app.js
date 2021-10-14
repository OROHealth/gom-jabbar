require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

const apiRouter = require('./routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

mongoose.connect(
  'mongodb+srv://OROHealth:9VM9PvI6vjOygskg@cluster0.wzdwx.mongodb.net/Schitts?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongodb db connection established');
});

apiRouter(app);

app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
