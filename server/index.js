const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 1337;
require('dotenv').config();
//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//mount api router
app.use('/api', require('./api'));

// Static middleware
const PUBLIC_PATH = path.join(__dirname, '../public');
const DIST_PATH = path.join(__dirname, '../dist');
app.use(express.static(PUBLIC_PATH));
app.use(express.static(DIST_PATH));

//any request to homepage of app will serve up the index.html page ?
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
