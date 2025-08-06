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
const session = require("express-session");
const pool = require('./database/')
const accountRoute = require("./routes/accountRoute");
const errorRoute = require("./routes/errorRoute");
const review = require("./routes/reviewRoute")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

/* ***********************
 * Middleware
 *************************/
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(utilities.checkJWTToken)
app.use(cors({
  origin: "https://starter-l2j4.onrender.com", 
  credentials: true 
}));

app.set("trust proxy", 1);

app.use(session({
  store: new (require('connect-pg-simple')(session))({
    createTableIfMissing: true,
    pool, // Use the database connection pool
  }),
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  name: "sessionId",
   cookie: {
    secure: process.env.NODE_ENV === "production", // secure in production
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // allow cross-site cookies
  }

}))

//body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//express message middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

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


//review route
app.use("/reviews", utilities.checkJWTToken, review)

// Index route
app.get("/", utilities.checkJWTToken, basecontroller.buildHome);

//account Route
app.use("/account", accountRoute )
// Error route
app.use('/error', errorRoute);

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

