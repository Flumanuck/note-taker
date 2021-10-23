const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.send("GET notes");
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
