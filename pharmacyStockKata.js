const readline = require("readline");

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

inquirer.on("close", function () {
  console.table(medicationList);
  process.exit(0);
});

const medicationList = {};

function addMedications() {
  inquirer.question(
    "What medication would you like to add to your formulary?",
    (name) => {
      if (name) medicationList[name.toLowerCase()] = [];
      inquirer.question(
        "Do you wish to add more medication?(y/n)",
        (answer) => {
          if (answer.toLowerCase() === "n" || answer.toLowerCase() === "no") {
            return inquirer.close();
          }
          addMedications();
        }
      );
    }
  );
}

addMedications();
