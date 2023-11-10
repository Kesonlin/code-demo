const https = require("https");
const http = require("http");

https.get("https://cdn.skypack.dev/react-dom", (res) => {
  console.log(res.statusCode);
});
