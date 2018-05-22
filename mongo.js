const MongoClient = require('mongodb').MongoClient;

const accessPoint = 'mongodb://127.0.0.1:27017';

let db = null;

const addFirstRecord = function (collection) {
  collection.remove();
  collection.insert({
    id: 1,
    status: false,
    updated_at: new Date()
  });
};

const addHistory = function (status) {
  db.collection('history', (err, collection) => {
    collection.insert({
      status: status,
      created_at: new Date()
    });
  });
};

exports.initialize = function () {
  MongoClient.connect(accessPoint, (err, client) => {
    if (err) {
      return console.dir(err);
    }
    db = client.db('mydb');
  });
};

exports.getStatus = function () {
  return new Promise((resolve, reject) => {
    db.collection('main', (err, collection) => {
      collection.find({id: 1}).toArray((err, items) => {
        if (items && items[0]) {
          return resolve(items[0]);
        } else {
          return resolve({});
        }
      });
    });
  });
};

exports.updateStatus = function (status) {
  const _status = !!status;
  return new Promise((resolve, reject) => {
    db.collection('main', (err, collection) => {
      collection.find({id: 1}).toArray((err, items) => {
        if (items.length !== 1) {
          // First record
          addFirstRecord(collection);
        } else if(items[0].status === _status) {
          // Same as before
          return reject({});
        }

        const updateParam = {
          status: _status,
          updated_at: new Date()
        };

        collection.update({id: 1}, {
          $set: updateParam
        });

        addHistory(_status);

        return resolve(updateParam);
      });
    });
  });
};

exports.getHistory = function () {
  return new Promise((resolve, reject) => {
    db.collection('history', (err, collection) => {
      collection.find({}).toArray((err, items) => {
        return resolve(items);
      });
    });
  });
};
