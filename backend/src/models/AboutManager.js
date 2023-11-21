const AbstractManager = require("./AbstractManager");

class SponsorManager extends AbstractManager {
  constructor() {
    super({ table: "about" });
  }

  insert(about) {
    return this.database.query(
      `insert into ${this.table} (name, summary) values (?, ?)`,
      [about.name, about.summary]
    );
  }

  update(about) {
    return this.database.query(
      `update ${this.table} set name = ?, summary = ? where id = ?`,
      [about.name, about.summary, about.id]
    );
  }
}

module.exports = SponsorManager;
