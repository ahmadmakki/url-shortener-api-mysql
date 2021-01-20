const sql = require("./db.js");

const Url = function(url) {
  this.originalUrl = url.originalUrl;
  this.shorternUrl = url.shorternUrl;
};

Url.create = (newUrl, result) => {
  sql.query("INSERT INTO urls SET ?", newUrl, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created url: ", { id: res.insertId, ...newUrl });
    result(null, { id: res.insertId, ...newUrl });
  });
};

Url.findById = (id, result) => {
  sql.query(`SELECT * FROM urls WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found url: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

Url.getAll = result => {
  sql.query("SELECT * FROM urls", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("urls: ", res);
    result(null, res);
  });
};
//update the original URL given its ID

Url.updateById = (id, url, result) => {
  sql.query(
    "UPDATE urls SET originalUrl = ? WHERE id = ?",
    [url.originalUrl , id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated url: ", { id: id, ...url });
      result(null, { id: id, ...url });
    }
  );
};

Url.remove = (id, result) => {
  sql.query("DELETE FROM urls WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted url with id: ", id);
    result(null, res);
  });
};


module.exports = Url;