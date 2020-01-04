// CRUD create read update and delete operations
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;
const ObjectID = require("mongodb").ObjectID;
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

    // --------------------- Users Operations --------------------

    // Insert a new document - Users Database
    db.collection('users').insertOne({
      name: 'Hassan Zaid',
      age: 30
    }, (error, result) => {
      if (error) {
        return process.stdout.write("Unable to connect to Database");
      }

      result.ops;
    });

    // Find the first record that matches the condition - Users Database
    db.collection("users").findOne({name: "Lutfi Qaraman"}, (error, user) => {
      if (error) {
        return process.stdout.write("Unable to fetch such a user");
      }

      console.log(user);
    });

    // Find all but skip the first two records - Users Database
    db.collection("users").find({name: "Lutfi Qaraman"}).skip(2).toArray((error, users) => {
      if (error) {
        return process.stdout.write("Unable to find users");
      }
      console.log(users);
    });

    // Show the count of records that matches the condition - Users Database
    db.collection("users").find({name: "Lutfi Qaraman"}).count((error, count) => {
      if (error) {
        return process.stdout.write("Unable to find users");
      }
      console.log(count);
    });

    // --------------------- Tasks Operations --------------------

    // Insert many documents - Tasks Database
    db.collection("tasks").insertMany(
      [
        {
          description: "Learning NodeJS",
          completed: true
        },
        {
          description: "Watching Match",
          completed: false
        },
        {
          description: "Going to the mall",
          completed: false
        }
      ],
      (error, result) => {
        if (error) {
          return process.stdout.write("Unable to insert documents");
        }

        result.ops;
      }
    );

    // Find the last task record - Tasks Database
    db.collection("tasks").findOne({ _id: new ObjectID("5e10adf9abf95c1f28250ccd") }, (error, task) => {
      if (error) {
        return process.stdout.write("Unable to fetch such a task");
      }

      console.log(task);
    });

    // // Find all tasks that are not completed - Tasks Database
    // db.collection("tasks").find({completed: false}).toArray((error, tasks) => {
    //   if (error) {
    //     return process.stdout.write("Unable to fetch tasks");
    //   }
    //   console.log(tasks);
    // });

  }
);
