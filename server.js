const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const fs = require("fs");

const jsonread = fs.readFileSync("./test.json");
const jsondata = JSON.parse(jsonread);

const app = express();
const router = require("./apiRouter");

dotenv.config({ path: "./config.env" });

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public"), { index: false }));
app.use(cors());
// const fs = require("fs");
// const https = require("https");

app.use(helmet());
app.use(express.json());

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected succesfull!"));

app.use("/api", router);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/home/index.html"))
);

app.get("/testdata", (req, res) => res.status(200).json(jsondata));

// HTTPS Options
// const options = {
//   key: fs.readFileSync("./cert/key.pem"),
//   cert: fs.readFileSync("./cert/cert.pem"),
// };

app.listen(process.env.PORT || 3443, () =>
  console.log(`connected to port ${process.env.PORT}`)
);

// https
//   .createServer(options, app)
//   .listen(3443, () => console.log("listening on port 3443"));

// require("greenlock-express")
//   .init({
//     packageRoot: __dirname,
//     configDir: "./greenlock.d",

//     // contact for security and critical bug notices
//     maintainerEmail: "wardlavrijsen@gmail.com",

//     // whether or not to run at cloudscale
//     cluster: false,
//   })
//   // Serves on 80 and 443
//   // Get's SSL certificates magically!
//   .serve(app);
