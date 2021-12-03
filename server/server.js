// Server
const fs = require("fs");
const http = require("http");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // request
  console.log(req.url, req.method);

  // response
  res.setHeader("Content-Type", "text/html;charset=utf-8");

  // res.write("<head><title>Server App</title></head>");
  // res.write("<h2>Server App</h2>");
  // res.write("<p>Hello, Prasan!</p>");
  // res.end();

  let num = _.random(0, 99);
  console.log(num);

  let path = "views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
      break;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    // res.write(data);
    // res.end();

    res.end(data);
  });
});

// localhost = http://127.0.0.1:6060/
server.listen(6060, "localhost", () => {
  console.log("listening for request on port 6060");
});
