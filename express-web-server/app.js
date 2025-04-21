'use strict';
const express = require('express');
const indexRoutes = require('./routes');
const helloRoutes = require('./routes/hello');
const createError = require('http-errors');
const app = express();

app.use('/', indexRoutes);
app.use('/hello', helloRoutes);

// avant dernier middleware
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    next(createError(405));
    return;
  }
  next(createError(404));
});

// dernier middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
