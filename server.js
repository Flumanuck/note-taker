const express = require("express");
const fs = require("fs");
const db = require("./db/db.json");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  const id = uuidv4();

  db.push({ id, title, text });

  fs.writeFile("db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!");
    }
    res.send("POSTED note");
  });
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  db.forEach((note, index) => {
    if (id === note.id) {
      db.splice(index, 1);
    }
  });

  fs.writeFile("db/db.json", JSON.stringify(db), function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Success!");
    }
    res.send(`DELETED note ${id}`);
  });
});

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
