const inquirer = require("inquirer");
const cTable = require("console.table");

require("dotenv").config();

const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "PumpkinSpookbear2021!",
  database: "employees",
});

port: 3306,
  connection.connect(function (err) {
    if (err) throw err;
    userPrompt();
    console.log("SQL connected");
  });

// const department = require("./lib/Departments.js");
// const role = require("./lib/Roles.js");
// const employee = require("./lib/Employees.js");

// let allEmployee = [];
// let allRole = [];

function userPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "What would you like to do",
        choices: [
          "VIEW all departments",
          "VIEW all roles",
          "VIEW all employees",
          "ADD a department",
          "ADD a role",
          "ADD an employee",
          "UPDATE a department",
          "UPDATE a role",
          "UPDATE an employee",
          "DELETE a department",
          "DELETE a role",
          "DELETE an employee",
          "EXIT",
        ],
      },
    ])
    .then((res) => {
      console.log(res.choices);
      switch (res.choices) {
        case "VIEW all departments":
          viewDepartment();
          break;
        case "VIEW all roles":
          viewRole();
          break;
        case "VIEW all employees":
          viewEmployee();
          break;
        case "ADD a department":
          addDepartment();
          break;
        case "ADD a role":
          addRole();
          break;
        case "ADD an employee":
          addEmployee();
          break;
        case "UPDATE a department":
          updateDepartment();
          break;
        case "UPDATE a role":
          updateRole();
          break;
        case "UPDATE an employee":
          updateEmployee();
          break;
        case "Delete a department":
          deleteDepartment();
          break;
        case "DELETE a role":
          deleteRole();
          break;
        case "DELETE an employee":
          deleteEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });

  function viewDepartment() {
    var query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table("All Departments:", res);
      userPrompt();
    });
  }

  function viewRole() {
    var query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.table("All Roles:", res);
      userPrompt();
    });
  }

  function viewEmployee() {
    var query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      console.log(res.length + " employees found!");
      console.table("All Employees:", res);
      userPrompt();
    });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          name: "newDepartment",
          type: "input",
          message: "Enter the name of the new department:",
        },
      ])
      .then(function (answer) {
        connection.query("INSERT INTO department SET ?", {
          name: answer.newDepartment,
        });
        var query = "SELECT * FROM department";
        connection.query(query, function (err, res) {
          if (err) throw err;
          console.log("Success! This new department has been added.");
          console.table("All Departments:", res);
          userPrompt();
        });
      });
  }

  function addRole() {
    connection.query(
      "SELECT * FROM role",
      function (err, res) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "newRole",
              type: "input",
              message: "Enter the name of the new role:",
            },
            {
              name: "salary",
              type: "number",
              message: "Enter a numeric salary:",
            },
            {
              name: "department",
              type: "list",
              choices: function () {
                var departmentArray = [];
                for (let i = 0; i < res.length; i++) {
                  departmentArray.push(res[i].title);
                }
                return departmentArray;
              },
              message: "Enter the department of the new Role:",
            },
          ])
          .then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
              if (res[a].title == answer.department) {
                department_id = res[a].id;
                console.log(department_id);
              }
            }
            connection.query("INSERT INTO role SET ?", {
              title: answer.newRole,
              salary: answer.salary,
              department_id: department_id,
            });
            var query = "SELECT * FROM role";
            connection.query(query, function (err, res) {
              if (err) throw err;
              console.log("Success! This new role has been added.");
              console.table("All Roles:", res);
              userPrompt();
            });
          });
      },

      function addEmployee() {
        connection.query("SELECT * FROM role", function (err, res) {
          if (err) throw err;
          inquirer
            .prompt([
              {
                name: "first_name",
                type: "input",
                message: "Enter the employee's first name:",
              },
              {
                name: "last_name",
                type: "input",
                message: "Enter the employee's last name:",
              },
              {
                name: "manager",
                type: "input",
                message: "Enter the employee's Manager:",
              },
              {
                name: "role",
                type: "list",
                choices: function () {
                  var roleArray = [];
                  for (let i = 0; i < res.length; i++) {
                    roleArray.push(res[i].title);
                  }
                  return roleArray;
                },
                message: "Enter the employee's Role:",
              },
            ])
            .then(function (answer) {
              let role_id;
              for (let a = 0; a < res.length; a++) {
                if (res[a].title == answer.role) {
                  role_id = res[a].id;
                  console.log(role_id);
                }
              }
              connection.query(
                "INSERT INTO employee SET ?",
                {
                  first_name: answer.first_name,
                  last_name: answer.last_name,
                  manager: answer.manager,
                  role_id: role_id,
                },
                function (err) {
                  if (err) throw err;
                  console.log("Success! This new employee has been added.");
                  userPrompt();
                }
              );
            });
        });
      },

      function exitApp() {
        connection.end();
      }
    );
  }
}
