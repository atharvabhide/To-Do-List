const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
app.set('view engine', 'ejs');
app.use(express.static("public"));
let tasks = [];
let workTasks = [];

app.get 
(
    "/",
    function (req, res)
    {
        let day = date();
        res.render("list", {listTitle : day, newTasks : tasks});
    }
);

app.get
(
    "/work",
    function (req, res)
    {
        res.render("list", {listTitle : "Work", newTasks : workTasks});
    }
);

app.get
(
    "/about",
    function (req, res)
    {
        res.render("about");
    }
);

app.post
(
    "/",
    function (req, res)
    {
        let task = req.body.newTask;
        if (req.body.list === "Work")
        {
            workTasks.push(task);
            res.redirect("/work");
        }
        else
        {
            tasks.push(task);
            res.redirect("/");
        }
    }
);

app.post
(
    "/work",
    function (req, res)
    {
        let item = req.body.newTask;
        workTasks.push(item);
        res.redirect("/work");
    }
);

app.listen
(
    process.env.PORT || 3000,
    function ()
    {
        console.log("Server running on port 3000");
    }
);