const express = require("express");
const Datastore = require("nedb");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening at ${port}`));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

// Load database
const database = new Datastore("./data/database.db");
database.loadDatabase();

// Submit new score to database
app.post("/submit", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;

  // search if there's already a score for this user
  // and update the score and the date if the score is higher than the one in the database
  database.find({ username: data.username }, (err, docs) => {
    if (err) {
      console.log(err);
      response.end();
      return;
    }
    if (docs.length > 0) {
      if (data.score > docs[0].score) {
        database.update(
          { username: data.username },
          data,
          {},
          (err, numReplaced) => {
            if (err) {
              console.log(err);
              response.end();
              return;
            }
            console.log("Updated " + numReplaced + " document(s)");
            response.json({
              status: "success",
            });
            response.end();
          }
        );
      } else {
        response.json({
          status: "failed",
        });
        response.end();
      }
    } else {
      database.insert(data);
      response.json({
        status: "success",
      });
      response.end();
    }
  });
});

// Get all scores from database
app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});
