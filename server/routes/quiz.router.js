const express = require("express");
const fs = require("fs");
const jsonServer = require("json-server");

const router = express.Router();
const dbPath = "db.json";

router.patch("/move", async (req, res) => {
  const dbServer = jsonServer.router(dbPath);
  const db = dbServer.db.getState();
  const quizIds = req.body.quizIds;
  const folderId = req.body.folderId;

  let quizzes = db.quizzes.filter((item) => quizIds.includes(item.id));

  // Update the items in the database
  quizzes.forEach((update) => {
    const index = db.quizzes.findIndex((item) => item.id === update.id);
    if (index !== -1) {
      db.quizzes[index] = { ...db.quizzes[index], folderId: folderId };
    }
  });

  // Save the updated database
  dbServer.db.write(db);
  setTimeout(() => {
    res.jsonp(quizzes);
  }, 1000);
});

router.patch("/update-index", async (req, res) => {
  const jsonServerDB = jsonServer.router("db.json").db;
  const db = jsonServerDB.getState();
  const quizIds = req.body.quizIds;

  let quizzes = db.quizzes.filter((item) => quizIds.includes(item.id));

  // Update the items in the database
  quizzes.forEach((update) => {
    const index = db.quizzes.findIndex((item) => item.id === update.id);
    if (index !== -1) {
      db.quizzes[index] = {
        ...db.quizzes[index],
        order: quizIds.findIndex((id) => id === db.quizzes[index].id),
      };
    }
  });

  // Save the updated database
  await jsonServerDB.write(db);

  // Return the updated items
  res.jsonp(quizzes.sort((a, b) => a.order - b.order));
});

router.patch("/init-folder", (req, res) => {
  let db = JSON.parse(fs.readFileSync("db.json", "utf8"));
  // Update the items in the database
  db.quizzes = db.quizzes.map((quiz) => {
    return { ...quiz, folderId: null };
  });

  // Save the updated database
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  // Return the updated items
  res.status(200).send(db.quizzes);
});

module.exports = router;
