const AbstractManager = require("./AbstractManager");

class TechniqueManager extends AbstractManager {
  constructor() {
    super({ table: "techniques" });
  }

  insert(techniques) {
    return this.database.query(`insert into ${this.table} (name) values (?)`, [
      techniques.name,
    ]);
  }

  update(techniques) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`,
      [techniques.name, techniques.id]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }
}

module.exports = TechniqueManager;
