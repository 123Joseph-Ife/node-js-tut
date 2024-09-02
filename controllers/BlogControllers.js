const Blog = require("../models/blog");

const blog_index = (req, res) => {
    Blog.find()
        .sort({ createdAt: -1 })
        .then((result) => {
            res.render("blogs/index", { title: "all blogs", blogs: result });
        })
        .catch((err) => {
            res.render("404", { title: "404 not foound" });
        });
};

const blog_post = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => res.redirect("/blogs"))
        .catch((err) => {
            res.render("404", { title: "404 not foound" });
        });
};

const blog_create = (req, res) => {
    res.render("blogs/create", { title: "create" });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render("blogs/blog", { title: "Blog details", blog: result });
        })
        .catch((err) => {
            res.render("404", { title: "404 not foound" });
        });
};

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: "/blogs" });
        })
        .catch((err) => {
            res.render("404", { title: "404 not foound" });
        });
};

module.exports = {
    blog_index,
    blog_post,
    blog_create,
    blog_details,
    blog_delete,
};
