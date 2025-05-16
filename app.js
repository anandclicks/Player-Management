const express = require("express");
const env = require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const connect_db = require("./helpers/db");
const globalErrorHandler = require("./middleware/errorHandler");
const playerRoutes = require("./Routes/player.route.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
