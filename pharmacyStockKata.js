const readline = require("readline");

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

inquirer.question("What is your name?", (name) => {
  inquirer.question("What is your age?", (age) => {
    console.log(`My name is ${name} and am ${age} years old.`);
    inquirer.close();
  });
});

inquirer.on("close", function () {
  console.table("Goodbye");
  process.exit(0);
});
