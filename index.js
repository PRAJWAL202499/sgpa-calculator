const express = require("express");
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
  host: "localhost",
  user: "root",
  database: "SGPA",
  password: "Prajwal@2006",
});


app.get("/home", (req, res) => {
  res.render("index.ejs");
});

app.get("/calculate" , (req,res)=>{
    res.render("forms.ejs");
});

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

app.listen(8080, () => {
  console.log("Server is running at http://localhost:8080/home");
});
