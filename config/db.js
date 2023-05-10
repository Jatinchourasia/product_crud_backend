const mongoose = require("mongoose");
const connectWithDb = async () => {
  try {
    const dbConnection = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DB connected`);
  } catch (error) {
    console.log(`DB connection error`);
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectWithDb;
