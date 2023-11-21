const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "articles" });
  }

  find(id) {
    return this.database.query(
      `select a.name, a.src, w.id from  ${this.table} as a
    inner join works as w on w.id = a.works_id 
    where a.id = ?`,
      [id]
    );
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  findAllByWork(id) {
    return this.database.query(
      `select * from ${this.table} WHERE works_id = ?`,
      [id]
    );
  }

  insert(article) {
    return this.database.query(
      `insert into ${this.table} (name, src, works_id) values (?, ? ,?)`,
      [article.name, article.src, article.works_id]
    );
  }

  update(article) {
    return this.database.query(
      `update ${this.table} set name = ?, src = ?, works_id = ? where id = ?`,
      [article.name, article.src, article.works_id, article.id]
    );
  }
}

module.exports = ArticleManager;
