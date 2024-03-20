// Set up express
const express = require("express");

// Set up app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up routers
const api = require("./routes/index");
const htmlRouter = require("./routes/html");

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(express.static("public"));

// Send all requests beginning with /api to index.js route folder
app.use("/api", api);
app.use("/", htmlRouter);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);

