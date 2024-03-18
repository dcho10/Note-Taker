const express = require("express");
const path = require("path");

const app = express();
const PORT = 3001;

const api = require("./routes/index");
const htmlRouter = require("./routes/html");

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use(express.static("public"));

app.use("/api", api);
app.use("/", htmlRouter);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

