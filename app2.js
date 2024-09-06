const express = require("express");
const app = express();
const blogRoutes = require("./routes/BlogRoutes")

const mongoose = require("mongoose");

const dbURI =
    "mongodb+srv://ifeoluwa:ifeoluwa@nodetuts.druvw.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";
mongoose
    .connect(dbURI)
    .then((res) => app.listen(3000))
    .catch((err) => {
        console.log(err);
    });

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log("new request made: ");
    console.log(`\tHost: ${req.hostname}`);
    console.log(`\tPath: ${req.path}`);
    console.log(`\tMethod: ${req.method}`);
    next();
});

app.get("/", (req, res) => {
    res.redirect("/blogs");
});

//blog routes


app.get("/about", (req, res) => {
    res.render("about", { title: "about" });
});


app.use('/blogs', blogRoutes)

app.use((req, res) => {
    res.render("404", { title: "404 not foound" });
});
