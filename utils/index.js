const connection = require("./connections");

class Db {
  constructor(connection) {
    this.connection = connection;
  }

  findAllDepartment() {
    return this.connection.promise().query("SELECT * FROM employees");
  }

  findAllRole() {
    return this.connection.promise().query("SELECT * FROM employees");
  }

  findAllEmployee() {
    return this.connection.promise().query("SELECT * FROM employees");
  }

module.exports = new Db(connection);
