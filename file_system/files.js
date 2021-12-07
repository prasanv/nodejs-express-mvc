const fs = require("fs");

// Reading content from files Asynchronously
fs.readFile("file_system/docs/blogs.txt", (err, data) => {
  if (err) console.error(err);
  console.log(data.toString());
});

console.log("Line after readFile async operation");

// Writing to a file Asynchronously
const newContent = "Hello, Prasan Venkat!";

fs.writeFile("file_system/docs/blogs.txt", newContent, "utf8", (error) => {
  if (error) console.log(error);
  console.log("File content overwrite successful");
});

fs.writeFile(
  "file_system/docs/blogz.txt",
  "Hello, world! this is BlogZ",
  (error) => {
    if (error) console.log(error);
    console.log("File creation and write successful");
  }
);

console.log("Line after writeFile async operation");

// Check if directory exists synchronously and Create/Delete directories asynchronously
if (!fs.existsSync("file_system/assets")) {
  fs.mkdir("file_system/assets", (err) => {
    if (err) console.log(err);
    console.log("directory created successfully");
  });
} else {
  fs.rmdir("file_system/assets", (err) => {
    if (err) console.log(err);
    console.log("directory removed successfully");
  });
}

// Delete files Asynchronously
if (fs.existsSync("file_system/docs/deleteMe.txt")) {
  fs.unlink("file_system/docs/deleteMe.txt", (err) => {
    if (err) console.log(err);
    console.log("file deleted");
  });
} else {
  fs.writeFile("file_system/docs/deleteMe.txt", newContent, (err) => {
    if (err) console.log(err);
  });
}
