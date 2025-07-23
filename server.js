/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const env = require("dotenv").config();
const app = express();
const staticRoutes = require("./routes/static");
const expressLayouts = require("express-ejs-layouts");
const inventoryRoute = require("./routes/inventoryRoute");
const utilities = require("./utilities"); 
const basecontroller = require('./controllers/basecontroler')

/* ***********************
 * Middleware
 *************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ***********************
 * View Engine Setup
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layouts/layout");

/* ***********************
 * Routes
 *************************/
app.use(staticRoutes);
app.use("/inv", inventoryRoute);

// Index route
app.get("/", basecontroller.buildHome);

// 404 Handler
app.use((req, res, next) => {
  const err = new Error("Page Not Found");
  err.status = 404;
  next(err);
});

// Error Handler (UPDATED)
app.use(async (err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  
  try {
    const nav = await utilities.getNav();
    res.status(status).render("error", {
      title: "Error",
      message: err.message,
      status: status,
      nav: nav
    });
  } catch (error) {
    res.status(status).render("error", {
      title: "Error",
      message: err.message,
      status: status,
      nav: '<ul><li><a href="/">Home</a></li></ul>'
    });
  }
});

/* ***********************
 * Server Configuration
 *************************/
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});

