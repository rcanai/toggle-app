const express = require('express');
const mongo = require('./mongo.js');
const cors = require('cors');

mongo.updateStatus();

const exp = express();
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

exp.get('/', (req, res) => {
  mongo.getStatus().then((item) => {
    res.render('index', {item: item});
  });
});

exp.get('/status', cors(), (req, res) => {
  mongo.getStatus().then((item) => {
    res.json(item);
  });
});

exp.post('/update', cors(), (req, res) => {
  const params = req.body || {};
  mongo.updateStatus(!!params.status).then((item) => {
    res.json(item);
  });
});
