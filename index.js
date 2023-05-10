require("dotenv").config();

const connectWithDb = require("./config/db");
const app = require("./app");

const PORT = 4000;

connectWithDb().then(() => {
  app.listen(PORT, () => console.log(`server running in ${PORT}`));
});
