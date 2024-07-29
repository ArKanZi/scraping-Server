require("dotenv").config();
const http = require("http");
const PORT = process.env.PORT;

const server = http.createServer(require("./app"));

server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT}`);
});
