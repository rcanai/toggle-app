const MongoClient = require('mongodb').MongoClient;

const accessPoint = 'mongodb://127.0.0.1:27017';

const defaultRecord = {
  status: false,
  updated_at: new Date()
};

const getCollection = function (callback) {
  MongoClient.connect(accessPoint, (err, client) => {
    if (err) {
      return console.dir(err);
    }
    const db = client.db('mydb');
    db.collection('main', (err, collection) => {
      if (typeof callback === 'function') {
        callback({ err, db, client, collection });
      }
    });
  });
};

exports.getStatus = function () {
  return new Promise((resolve, reject) => {
    getCollection(({ client, collection }) => {
      collection.find({id: 1}).toArray((err, items) => {
        client.close();
        if (items && items[0]) {
          resolve(items[0]);
        } else {
          resolve({});
        }
      });
    });
  });
};

exports.updateStatus = function (status) {
  return new Promise((resolve, reject) => {
    getCollection(({ client, collection }) => {
      collection.find({id: 1}).toArray((err, items) => {
        if (items.length !== 1) {
          collection.remove();
          defaultRecord.updated_at = new Date();
          collection.insert(defaultRecord);
        }

        const updateParam = {
          status: !!status,
          datetime: new Date()
        };

        collection.update({}, {
          $set: updateParam
        });

        client.close();

        resolve(updateParam);
      });
    });
  });
};

