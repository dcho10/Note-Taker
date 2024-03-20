const router = require("express").Router();

// Import files that contain routes
const notesRouter = require("./notes");
const htmlRouter = require("./html");

router.use("/notes", notesRouter);
router.use("/html", htmlRouter);

module.exports = router;