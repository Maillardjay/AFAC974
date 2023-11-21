const AbstractManager = require("./AbstractManager");

class UserFavouriteManager extends AbstractManager {
  constructor() {
    super({ table: "user_favourites" });
  }

  findFavouritesUser() {
    return this.database.query(
      `
        SELECT user_favourites.users_id, user_favourites.works_id, summary_title, image_src, image_alt
        FROM ${this.table}
        INNER JOIN  works on works.id = user_favourites.works_id
        INNER JOIN users on users.id = user_favourites.users_id       
        ORDER BY user_favourites.users_id ASC;
      `,
      []
    );
  }

  findFavouritesByIdUser(idUser) {
    return this.database.query(
      `
        SELECT user_favourites.users_id, user_favourites.works_id, summary_title, image_src, image_alt
        FROM ${this.table}
        INNER JOIN  works on works.id = user_favourites.works_id
        INNER JOIN users on users.id = user_favourites.users_id
        WHERE user_favourites.users_id = ?;
      `,
      [idUser]
    );
  }

  findFavouritesByEmailUser(emailUser) {
    return this.database.query(
      `
        SELECT user_favourites.users_id, user_favourites.works_id, title, summary_title, image_src, image_alt
        FROM ${this.table}
        INNER JOIN  works on works.id = user_favourites.works_id
        INNER JOIN users on users.id = user_favourites.users_id
        WHERE users.email = ?;
      `,
      [emailUser]
    );
  }

  async isFavourite(emailUser, workId) {
    const [rows] = await this.database.query(
      `
      SELECT *
      FROM ${this.table}
      INNER JOIN users on users.id = user_favourites.users_id
      WHERE users.email = ? AND user_favourites.works_id = ?;
      `,
      [emailUser, workId]
    );
    return !!rows.length;
  }

  deleteFavouritesByEmailUser(emailUser, workId) {
    return this.database.query(
      `
        DELETE user_favourites.*
        FROM user_favourites
        INNER JOIN users on users.id = user_favourites.users_id
        WHERE email = ? AND works_id = ?;
      `,
      [emailUser, workId]
    );
  }

  insert(emailUser, workId) {
    return this.database.query(
      `
      INSERT INTO user_favourites (users_id, works_id)
      VALUES ((SELECT id FROM users where email = ?), ?)
      
      `,
      [emailUser, workId]
    );
  }
}

module.exports = UserFavouriteManager;
