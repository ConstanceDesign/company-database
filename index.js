const inquirer = require("inquirer");
const tables = require("console.table");
const db = require("./utils/index");
const { findAllEmployee } = require("./utils/index");

inquirer
  .prompt([
    {
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee",
      ],
    },
  ])
  .then((res) => {
    console.log(res.choices);
    switch (res.choices) {
      case "View all departments":
        findAllDepartment();
        break;
      case "View all roles":
        findAllDepartment();
        break;
      case "View all employees":
        findAllEmployee();
        break;
    }
  });

function findAllDepartment() {
  db.getDepartment().then((data) => {
    console.log(data);
  });
}

function findAllRole() {
  db.getRole().then((data) => {
    console.log(data);
  });
}

function findAllEmployee() {
  db.findAllEmployee().then((data) => {
    console.log(data);
  });
}
