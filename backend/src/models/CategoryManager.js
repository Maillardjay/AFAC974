const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "categories" });
  }

  insert(categories) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      categories.name,
    ]);
  }

  update(categories) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [categories.name, categories.id]
    );
  }
}

module.exports = CategoryManager;
