// CRUD create read update and delete operations
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager-DB";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return process.stdout.write("Unable to connect to database");
    }

    const db = client.db(databaseName);
    
    db.collection('users').insertOne({
        name: "Lutfi Qaraman",
        age: 35,
    });
  }
);
