// Read and write data from large files using streams
const { createReadStream, createWriteStream, existsSync } = require("fs");

const readStream = createReadStream("file_system/docs/blog1.txt", {
  // encoding: "utf-8",
});
const writeStream = createWriteStream("file_system/docs/blog2.txt");

readStream.on("data", (chunk) => {
  console.log("--------------- NEW CHUNK -----------------");
  console.log(chunk);
  writeStream.write("\nNEW CHUNK\n");
  writeStream.write(chunk);
});

// Piping
const readPipe = createReadStream("file_system/docs/blog3.txt");
const writePipe = createWriteStream("file_system/docs/blog4.txt");

readPipe.pipe(writePipe);
