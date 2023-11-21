const AbstractManager = require("./AbstractManager");

class BiographyManager extends AbstractManager {
  constructor() {
    super({ table: "biography" });
  }

  insert(biography) {
    return this.database.query(
      `insert into ${this.table} 
    (
    name,
    title1,
    image1_src,
    image1_alt,
    text1,
    title2,
    image2_src,
    image2_alt,
    text2,
    title3,
    image3_src,
    image3_alt,
    text3) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        biography.name,
        biography.title1,
        biography.image1_src,
        biography.image1_alt,
        biography.text1,
        biography.title2,
        biography.image2_src,
        biography.image2_alt,
        biography.text2,
        biography.title3,
        biography.image3_src,
        biography.image3_alt,
        biography.text3,
      ]
    );
  }

  update(biography) {
    return this.database.query(
      `update ${this.table} set name = ?, title1 = ?, image1_src = ?, image1_alt = ?, text1 = ?, title2 = ?, image2_src = ?, image2_alt = ?, text2 = ?, title3 = ?, image3_src = ?, image3_alt = ?, text3 = ? where id = ?`,
      [
        biography.name,
        biography.title1,
        biography.image1_src,
        biography.image1_alt,
        biography.text1,
        biography.title2,
        biography.image2_src,
        biography.image2_alt,
        biography.text2,
        biography.title3,
        biography.image3_src,
        biography.image3_alt,
        biography.text3,
        biography.id,
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

module.exports = BiographyManager;
