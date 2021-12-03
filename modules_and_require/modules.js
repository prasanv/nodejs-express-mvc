// importing custom modules
const xyz = require("./peoples");
const { schools, postal_code } = require("./schools");

console.log(xyz);

console.log(xyz.persons);

console.log(schools, postal_code);

// importing core modules
const os = require("os");

const osDetails = {
  homedir: os.homedir(),
  type: os.type(),
  hostname: os.hostname(),
  platform: os.platform(),
  userInfo: os.userInfo(),
  version: os.version(),
};
console.log(osDetails);
