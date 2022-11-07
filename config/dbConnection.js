require("dotenv").config();
const mongoose = require("mongoose");

async function dbConnect() {
  
  const username = process.env.USER_NAME;
  const password = process.env.PASS;
  const cluster = process.env.CLUSTER;
  const dbname = process.env.DB_NAME;
  await mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = mongoose.connection;
  console.log(db.name);
  await db.on("error", console.error.bind(console, "connection error: "));
  await db.once("open", function () {
    console.log("Connected successfully");
  });
}

//dbConnect();

module.exports = { dbConnect };
