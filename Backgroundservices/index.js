const express = require("express");
const cron = require("node-cron");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const contributionEmail = require("./EmailService/Contribution");


dotenv.config();

mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
const schedule = () => {
  cron.schedule("* * * * * *", () => {
    contributionEmail();
  });
};

schedule();
app.listen(process.env.PORT, () => {
  console.log("Server is running on port " + process.env.PORT);
});
