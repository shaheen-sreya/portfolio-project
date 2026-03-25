const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));

// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // your MySQL password
    database: "portfolio_db"
});

db.connect(err => {
    if(err) throw err;
    console.log("Database connected!");
});

// POST API for contact form
app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;
    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
        if(err) throw err;
        console.log("Sending thank you page");
        res.sendFile(__dirname + "/public/thankyou.html");
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));