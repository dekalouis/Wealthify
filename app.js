const express = require("express");
const app = express();
const routes = require("./routers");
const session = require("express-session");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true
  }
}))

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", routes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
