const express = require('express');
const helmet = require('helmet');
const cors = require('cors'); // https://www.npmjs.com/package/cors
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bearRouter = require('./BearRoutes.js');

const server = express();

server.use(helmet()); // https://helmetjs.github.io/
server.use(cors());   // https://medium.com/trisfera/using-cors-in-express-cac7e29b005b
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ status: 'API Running' });
});

server.use('/api/bears', bearRouter);

  mongoose.connect('mongodb://localhost/store')
    .then(conn => {
      console.log('Successfully Connected to MongoDB');
    })
    .catch(err => {
      console.log('Database connection failed');
    }
  );

  const port = process.env.PORT || 5005;
  server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});
