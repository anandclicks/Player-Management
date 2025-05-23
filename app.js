const express = require("express");
const env = require("dotenv").config();
const app = express();
const connect_db = require("./helpers/db");
const globalErrorHandler = require("./middleware/errorHandler");
const playerRoutes = require("./Routes/player.route.js");

// For handling encryption type multipart/form-data 
const multer = require('multer')
const upload = multer()
app.use(upload.none())

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use("/players", playerRoutes);

app.use(globalErrorHandler);

const startServer = async () => {
  const PORT = process.env.PORT || 8001;
  connect_db()
    .then(() =>
      app.listen(PORT, () => console.log(`Server is running at ${PORT}`))
    )
    .catch(() => {
      console.log("DB connection Failed");
      process.exit(1);
    });
};
startServer();
