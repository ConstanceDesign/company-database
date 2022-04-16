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
        "DELETE a department",
        "VIEW all roles",
        "ADD a role",
        "DELETE a role",
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
        case "DELETE a department":
          deleteDepartment();
          break;
        case "VIEW all roles":
          viewRoles();
          break;
        case "ADD a role":
          addRole();
          break;
        case "DELETE a role":
          deleteRole();
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
          updateEmployeeRole();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}

// view departments
function viewDepartments() {
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + "All Departments:");
    console.table("All Departments:", res);
    userPrompt();
  });
}

// add department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Add new department:",
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

// delete department
function deleteDepartment() {
  const deleteDepartment =
    "SELECT department.id,department.name FROM department;";
  connection.query(deleteDepartment, (error, res) => {
    if (error) throw error;
    const departmentsList = res.map((data) => ({
      value: data.id,
      name: `${data.name}`,
    }));

    promptDepartments(departmentsList);
  });
}
function promptDepartments(departmentsList) {
  inquirer
    .prompt([
      {
        name: "id",
        type: "list",
        message: "Select department to delete:",
        choices: departmentsList,
      },
    ])
    .then((answer) => {
      const deleteDepartment = "DELETE from department where department.id=?;";
      connection.query(deleteDepartment, [answer.id], (error, res) => {
        if (error) throw error;
        console.table(res);
        console.log("Success! Department deleted.");
        userPrompt();
      });
    });
}

// view roles
function viewRoles() {
  var query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + "All Roles:");
    console.table("All Roles:", res);
    userPrompt();
  });
}

// add role
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
            var departmentArray = [];
            for (let i = 0; i < res.length; i++) {
              departmentArray.push(res[i].name);
            }
            return departmentArray;
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

// delete role
function deleteRole() {
  const query = "SELECT role.id, role.title FROM role;";
  connection.query(query, (error, res) => {
    if (error) throw error;
    const listRoles = res.map((data) => ({
      value: data.id,
      name: `${data.title}`,
    }));

    promptRole(listRoles);
  });
}
function promptRole(listRoles) {
  inquirer
    .prompt([
      {
        name: "id",
        type: "list",
        message: "Select role to delete:",
        choices: listRoles,
      },
    ])
    .then((answer) => {
      const deleteRole = "DELETE from role where role.id=?;";
      connection.query(deleteRole, [answer.id], (error, res) => {
        if (error) throw error;
        console.table(res);
        console.log("Success! Role deleted.");
        userPrompt();
      });
    });
}

// view employees
function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + "All Employees:");
    console.table("All Employees:", res);
    userPrompt();
  });
}

// add employee
function addEmployee() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "Enter new employee's first name:",
        },
        {
          name: "last_name",
          type: "input",
          message: "Enter new employee's last name:",
        },
        {
          name: "manager",
          type: "input",
          message: "Enter new employee's manager:",
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
          message: "Enter new employee's role:",
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
            console.log("Success! New employee has been added.");
            userPrompt();
          }
        );
      });
  });
}

// update employee role
function updateEmployeeRole() {
  const updateRole =
    "SELECT employee.id, employee.first_name,employee.last_name FROM employee;";
  connection.query(updateRole, (error, res) => {
    if (error) throw error;
    const listEmployees = res.map((data) => ({
      value: data.id,
      name: `${data.first_name} ${data.last_name}`,
    }));

    getList(listEmployees);
  });
}
function getList(listEmployees) {
  inquirer
    .prompt({
      name: "employee_id",
      type: "list",
      message: "Select employee to update role:",
      choices: listEmployees,
    })
    .then((answer) => {
      listRole(answer.employee_id);
    });
}
function listRole(employeeId) {
  const RoleQuery = "SELECT role.id, role.title FROM role;";
  connection.query(RoleQuery, (error, res) => {
    if (error) throw error;
    const listRoles = res.map((data) => ({
      value: data.id,
      name: `${data.title}`,
    }));
    promptUpdate(listRoles, employeeId);
  });
}
function promptUpdate(listRoles, employeeId) {
  inquirer
    .prompt({
      name: "role_id",
      type: "list",
      message: "Select new role:",
      choices: listRoles,
    })
    .then((answer) => {
      const updateEmployee =
        "UPDATE employee SET employee.role_id=? WHERE employee.id=?";
      connection.query(
        updateEmployee,
        [answer.role_id, employeeId],
        (error, res) => {
          if (error) throw error;
          console.table(res);
          console.log("Success! New employee has new role.");
          userPrompt();
        }
      );
    });
}

// delete employee
function deleteEmployee() {
  const deleteEmployee =
    "SELECT employee.id, employee.first_name,employee.last_name FROM employee;";
  connection.query(deleteEmployee, (error, res) => {
    if (error) throw error;
    const listEmployees = res.map((data) => ({
      value: data.id,
      name: `${data.first_name} ${data.last_name}`,
    }));
    promptEmployee(listEmployees);
  });
}
function promptEmployee(listEmployees) {
  inquirer
    .prompt([
      {
        name: "employee_id",
        type: "list",
        message: "Select employee to delete:",
        choices: listEmployees,
      },
    ])
    .then((answer) => {
      const deleteEmployee = "DELETE FROM employee where employee.id=?;";
      connection.query(deleteEmployee, [answer.employee_id], (error, res) => {
        if (error) throw error;
        console.table(res);
        console.log("Success! Employee deleted.");
        userPrompt();
      });
    });
}

function exitApp() {
  connection.end();
}
