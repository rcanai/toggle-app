const express = require('express');
const mongo = require('./mongo.js');
mongo.updateStatus();

const exp = express();
exp.listen(3000);

exp.use(express.json());
exp.use(express.urlencoded());

exp.use('/assets', express.static(__dirname + '/assets'));

exp.set('view engine', 'ejs');
exp.set('views',__dirname + '/views');

exp.get('/', (req, res) => {
  mongo.getStatus().then((item) => {
    res.render('index', {item: item});
  });
});

exp.get('/status', (req, res) => {
  mongo.getStatus().then((item) => {
    res.json(item);
  });
});

exp.post('/update', (req, res) => {
  const params = req.body || {};
  mongo.updateStatus(!!params.status).then((item) => {
    res.json(item);
  });
});
