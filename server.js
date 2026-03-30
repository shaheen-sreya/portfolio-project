const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "portfolio_db"
});

db.connect(err => {
    if (err) console.log(err);
    else console.log("MySQL Connected");
});

app.post("/contact", (req, res) => {
    console.log("DATA RECEIVED:", req.body);

    const { name, email, message } = req.body;

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.log("SQL ERROR:", err);
            res.send("Error");
        } else {
            console.log("INSERTED:", result);
            res.send("Success");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});