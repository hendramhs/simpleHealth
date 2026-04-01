const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// koneksi MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // isi kalau ada
  database: "kesehatan"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL Connected");
});

// CREATE
app.post("/pasien", (req, res) => {
  const { nama, umur, diagnosa } = req.body;
  db.query(
    "INSERT INTO pasien (nama, umur, diagnosa) VALUES (?, ?, ?)",
    [nama, umur, diagnosa],
    (err) => {
      if (err) throw err;
      res.json({ message: "Data ditambah" });
    }
  );
});

// READ
app.get("/pasien", (req, res) => {
  db.query("SELECT * FROM pasien", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// UPDATE
app.put("/pasien/:id", (req, res) => {
  const { nama, umur, diagnosa } = req.body;
  db.query(
    "UPDATE pasien SET nama=?, umur=?, diagnosa=? WHERE id=?",
    [nama, umur, diagnosa, req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Updated" });
    }
  );
});

// DELETE
app.delete("/pasien/:id", (req, res) => {
  db.query(
    "DELETE FROM pasien WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Deleted" });
    }
  );
});

app.listen(3000, () => console.log("Server jalan di port 3000"));