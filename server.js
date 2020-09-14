const express = require("express");
const path = require("path");
const passport = require("passport");

if (!(process.env.NODE_ENV && process.env.NODE_ENV == "production")) {
  require("dotenv").config();
}
require("./config/dbConnection");

const score = require("./routes/api/score");
const user = require("./routes/api/user");

const authMiddleware = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(passport.initialize());
require("./config/passport")(passport);

//public routes
app.use("/api/user", user);

//protected routes
app.use("/api/score", authMiddleware, score);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server started on PORT ${PORT}`)
);

