const AbstractManager = require("./AbstractManager");

class WorkManager extends AbstractManager {
  constructor() {
    super({ table: "works" });
  }

  find(id) {
    return this.database.query(
      `select w.id, w.title, w.summary_title, w.date, w.image_src, w.image_alt, w.reference, w.summary1, w.summary2, w.summary3, w.summary4, w.format, c.name as category, t.name as technique from  ${this.table} as w
    inner join categories as c on c.id = w.categories_id 
    inner join techniques as t on t.id = w.techniques_id 
    where w.id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  findAllByCategory(id) {
    return this.database.query(
      `select * from ${this.table} WHERE categories_id = ? ORDER BY rand() LIMIT 5`,
      [id]
    );
  }

  findAllByCategoryName(name) {
    return this.database.query(
      `select w.id, w.title, w.summary_title, w.date, w.image_src, w.image_alt, w.reference, w.summary1, w.summary2, w.summary3, w.summary4, w.format, c.name as category from ${this.table} AS w INNER JOIN categories AS c ON w.categories_id = c.id WHERE name = ?`,
      [name]
    );
  }

  insert(work) {
    return this.database.query(
      `insert into ${this.table} (title, summary_title, date, image_src, image_alt, reference, summary1, summary2, summary3, summary4, format, techniques_id, categories_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        work.title,
        work.summary_title,
        work.date,
        work.image_src,
        work.image_alt,
        work.reference,
        work.summary1,
        work.summary2,
        work.summary3,
        work.summary4,
        work.format,
        work.techniques_id,
        work.categories_id,
      ]
    );
  }

  update(work) {
    return this.database.query(
      `update ${this.table} set title = ?, summary_title = ?, date = ?, image_src = ?, image_alt = ?, reference = ?, summary1 = ?, summary2= ?, summary3 = ?, summary4 = ?, format = ?, techniques_id = ?, categories_id = ? where id = ?`,
      [
        work.title,
        work.summary_title,
        work.date,
        work.image_src,
        work.image_alt,
        work.reference,
        work.summary1,
        work.summary2,
        work.summary3,
        work.summary4,
        work.format,
        work.techniques_id,
        work.categories_id,
        work.id,
      ]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}

module.exports = WorkManager;
