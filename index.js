const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
});

port: 3306,
  connection.connect(function (err) {
    if (err) throw err;
    userPrompt();
    console.log("SQL connected");
  });

function userPrompt() {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "Welcome to the company database, select an option:",
      choices: [
        "VIEW all departments",
        "ADD a department",
        "VIEW all roles",
        "ADD a role",
        "VIEW all employees",
        "ADD an employee",
        "DELETE an employee",
        "UPDATE an employee role",
        "EXIT",
      ],
    })
    .then(function (user) {
      switch (user.choices) {
        case "VIEW all departments":
          viewDepartments();
          break;
        case "ADD a department":
          addDepartment();
          break;
        case "VIEW all roles":
          viewRoles();
          break;
        case "ADD a role":
          addRole();
          break;
        case "VIEW all employees":
          viewEmployees();
          break;
        case "ADD an employee":
          addEmployee();
          break;
        case "DELETE an employee":
          deleteEmployee();
          break;
        case "UPDATE an employee role":
          updateEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}

function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    userPrompt();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Add a new department:",
      },
    ])
    .then(function (user) {
      connection.query("INSERT INTO department SET ?", {
        name: user.newDepartment,
      });
      var query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        if (err) throw err;
        console.log("Success! New department added!");
        console.table("All Departments:", res);
        userPrompt();
      });
    });
}

function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Roles:", res);
    userPrompt();
  });
}

function addRole() {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "new_role",
          type: "input",
          message: "Add a new role:",
        },
        {
          name: "salary",
          type: "input",
          message: "Enter a numeric salary:",
        },
        {
          name: "Department",
          type: "list",
          choices: function () {
            var deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        },
      ])
      .then(function (user) {
        let department_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == user.Department) {
            department_id = res[a].id;
          }
        }

        connection.query(
          "INSERT INTO role SET ?",
          {
            title: user.new_role,
            salary: user.salary,
            department_id: department_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("Success! New role added!");
            console.table("All Roles:", res);
            userPrompt();
          }
        );
      });
  });
}

function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + "All Employees:");
    console.table("All Employees:", res);
    userPrompt();
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter the new employee's first name:",
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter the new employee's last name:",
        },
        {
          name: "manager",
          type: "input",
          message: "Enter the new employee's manager:",
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
          message: "Enter the new employee's role:",
        },
      ])
      .then(function (user) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == user.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: user.first_name,
            last_name: user.last_name,
            manager: user.manager,
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
}

function updateEmployee() {
  connection.query(
    "SELECT first_name, last_name FROM employee",
    function (err, res) {
      if (err) throw err;
      inquirer
        .prompt([
          {
            name: "employees",
            type: "list",
            choices: function () {
              var employeeArray = [];
              for (let i = 0; i < res.length; i++) {
                employeeArray.push(res[i].title);
              }
              return employeeArray;
            },
            message: "Select employee to update role:",
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
            message: "Select the employee's new role:",
          },
        ])
        .then(function (user) {
          let role_id;
          for (let a = 0; a < res.length; a++) {
            if (res[a].title == user.role) {
              role_id = res[a].id;
              console.log(role_id);
            }
          }
          connection.query(
            "INSERT INTO employee SET ?",
            {
              first_name: user.first_name,
              last_name: user.last_name,
              role_id: role_id,
            },
            function (err) {
              if (err) throw err;
              console.log("Success! This employee has a new role.");
              userPrompt();
            }
          );
        });
    }
  );
}

function exitApp() {
  connection.end();
}
