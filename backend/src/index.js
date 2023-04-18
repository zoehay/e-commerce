require("dotenv").config();
const app = require("./app");
const port = 8000;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
