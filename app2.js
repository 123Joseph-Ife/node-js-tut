const express = require("express");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/BlogRoutes");

const app = express();
const port = 3000;

const dbURI = "mongodb+srv://ifeoluwa:ifeoluwa@nodetuts.druvw.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodetuts";

mongoose.connect(dbURI)
    .then(() => app.listen(port, () => console.log(`Server running on port ${port}`)))
    .catch((err) => console.log(err));

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

app.get("/about", (req, res) => {
    res.render("about", { title: "about" });
});

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    res.render("404", { title: "404 not found" });
});
