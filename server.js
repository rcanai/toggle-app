const express = require('express');
const mongo = require('./mongo.js');
const cors = require('cors');

const exp = express();

/**
 * setting
 */
exp.listen(3000);

exp.use(express.json());
exp.use(express.urlencoded());

exp.use('/assets', express.static(__dirname + '/assets'));

exp.set('view engine', 'ejs');
exp.set('views',__dirname + '/views');

exp.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/**
 * routes
 */
exp.get('/', (req, res) => {
  mongo.getStatus()
    .then((item) => {
      res.status(200).render('index', {item: item});
    }).catch((err) => {
      res.status(400).json(err);
    })
  ;
});

exp.get('/status', cors(), (req, res) => {
  mongo.getStatus()
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(400).json(err);
    })
  ;
});

exp.get('/history', cors(), (req, res) => {
  mongo.getHistory()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(422).json(err);
    })
  ;
});

exp.post('/update', cors(), (req, res) => {
  const params = req.body || {};
  mongo.updateStatus(!!params.status)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((err) => {
      res.status(422).json(err);
    })
  ;
});

/**
 * mongo connect
 */
mongo.initialize();
