const express = require("express");
const app = express();

const path = require("path");

app.set( "views" , path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname , "/public")));
app.use(express.urlencoded({ extended: true }));

app.listen(8080 , ()=>{
    console.log("app is listening at port 8080")
});

app.set("view engine" , "ejs");

app.use("/home" , (req , res)=>{
    res.render("index.ejs");
});

app.use("/calculate" , (req,res)=>{
    let {name , usn , dsdv , epc , na , coa , math , adsdl , lpl , scr} = req.body;
    console.log(req.body);
    res.render("forms.ejs") ;
});
