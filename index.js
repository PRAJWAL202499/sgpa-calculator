const express = require("express");
require("dotenv").config();
const crypto = require("crypto");
const mysql = require("mysql2");
const path = require("path");
const { calculateGPA } = require("./public/calculate");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 4000,
  ssl: { minVersion: "TLSv1.2", rejectUnauthorized: true },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

app.get("/", (req, res) => {
  res.redirect("/home");
});
app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.get("/calculate", (req, res) => {
  res.render("forms.ejs");
});

app.get("/sgpa/ranking", (req, res) => {
  try {
    q = `SELECT name, usn, sgpa FROM users ORDER BY sgpa DESC LIMIT 5;`;
    connection.query(q, (err, result) => {
      if (err) throw err;
      res.render("ranking.ejs", { result });
    });
  } catch {
    console.log(err);
  }
});

app.post("/calculate/new", (req, res) => {
  const info = req.body;
  const sgpa = calculateGPA(info);
  const id = crypto.randomUUID();
  const usn = info.usn.toUpperCase();

  const query = `
  INSERT INTO users (id, name, usn, dsdv, epc, na, coa, math, adsdl, lpl, scr, sgpa) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    dsdv = VALUES(dsdv),
    epc = VALUES(epc),
    na = VALUES(na),
    coa = VALUES(coa),
    math = VALUES(math),
    adsdl = VALUES(adsdl),
    lpl = VALUES(lpl),
    scr = VALUES(scr),
    sgpa = VALUES(sgpa)
`;

  const values = [
    id,
    info.name,
    usn,
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
  try {
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).send("Error saving data to database.");
      }
      res.render("result.ejs", { info, sgpa });
    });
  } catch {
    console.log(err);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running");
});
