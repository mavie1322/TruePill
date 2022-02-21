const readline = require("readline");

const medicationsList = {
  amoxicilin: {},
  codeine: {},
  diclofenac: {},
  ibuprofen: {},
  paracetamol: {},
  simvastatin: {},
  tramadol: {},
  warfarin: {},
};

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const recursionFunction = (array) => {
  if (array.length === 0) {
    inquirer.close();
  }
  array.forEach((name) => {
    inquirer.question(
      `Would you like to enter the stock for ${name.toUpperCase()}?(y/n)    `,
      (response) => {
        if (
          response.toLowerCase() === "y" ||
          response.toLowerCase() === "yes"
        ) {
          const stockData = {};
          inquirer.question("Can you enter the strength:    ", (strength) => {
            stockData["Strength"] = `${strength}mg`;
            inquirer.question("Can you enter pack size:   ", (size) => {
              stockData["Pack Size"] = parseInt(size);
              inquirer.question("Can you enter total packs:     ", (total) => {
                stockData["Total Packs"] = parseInt(total);
                medicationsList[name] = stockData;
                recursionFunction(array.slice(1));
              });
            });
          });
        } else {
          const newMedicationName = array.slice(1);
          recursionFunction(newMedicationName);
        }
      }
    );
  });
};

const addStockToMedicationsList = () => {
  let medicationNameList = Object.keys(medicationsList);

  recursionFunction(medicationNameList);
};

inquirer.on("close", function () {
  console.table(medicationsList);
  process.exit(0);
});

addStockToMedicationsList();
