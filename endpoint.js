const express = require("express");
const app = express();
const dotenv = require("dotenv");

dotenv.config();
const port = process.env.PORT;

app.use(express.json());

app.post("/average", (req, res) => {
  const { service, average } = req.body;
  console.log(`Received average from ${service}: ${average}`);
});

app.listen(port, () => {
  console.log(`API server listening at http://yourserver:${port}`);
});
