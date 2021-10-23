const express = require("express");
const fs = require("fs");
const db = require("./db/db.json");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  console.log(db);
  //res.send("GET notes");
  res.json(db);
});

app.post("/api/notes", (req, res) => {
  res.send("POST notes");
});

app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  res.send(`DELETED note ${id}`);
});

// Listener
app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
