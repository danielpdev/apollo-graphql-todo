const express = require('express');
const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const schema = require('./schema');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors())
// Replace with your mongoLab URI
// mongodb://<dbuser>:<dbpassword>@ds247101.mlab.com:47101/todos-apollo-graphql
const MONGO_URI = 'mongodb://admin:password1@ds247101.mlab.com:47101/todos-apollo-graphql';
if (!MONGO_URI) {
  throw new Error('You must provide a MongoLab URI');
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
    .once('open', () => console.log('Connected to MongoLab instance.'))
    .on('error', error => console.log('Error connecting to MongoLab:', error));  

app.use(bodyParser.json());
app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Listening');
});

module.exports = app;
