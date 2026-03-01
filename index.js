const express = require("express");
require('dotenv').config();
const crypto = require("crypto");
const mysql = require("mysql2");
const path = require("path");
const { calculateGPA } = require("./public/calculate");

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 4000,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

app.get("/" , (req,res)=>{
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.get("/calculate" , (req,res)=>{
    res.render("forms.ejs");
});

app.get("/sgpa/ranking" , (req,res)=>{
  res.render("ranking.ejs")
})

app.post("/calculate/new", (req, res) => {
  const info = req.body;
  const sgpa = calculateGPA(info);
  const id = crypto.randomUUID();

  const query = `INSERT INTO users (id, name, usn, dsdv, epc, na, coa, math, adsdl, lpl, scr, sgpa) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    id,
    info.name,
    info.usn,
    Number(info.dsdv),
    Number(info.epc),
    Number(info.na),
    Number(info.coa),
    Number(info.math),
    Number(info.adsdl),
    Number(info.lpl),
    Number(info.scr),
    sgpa,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Error saving data to database.");
    }
    // Render the result page after successful DB insertion
    res.render("result.ejs", { info, sgpa });
  });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running at http://localhost:8080/home");
});
