const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogControllers");

router.get("/", blogController.blog_index);
router.post("/", blogController.blog_post);
router.get("/create", blogController.blog_create);
router.get("/:id", blogController.blog_details);
router.delete("/:id", blogController.blog_delete);

module.exports = router;
