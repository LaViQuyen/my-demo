const express = require("express");
const fs = require("fs");

const router = express.Router();

router.patch("/update", (req, res) => {
  let db = JSON.parse(fs.readFileSync("db.json", "utf8"));
  // Update the items in the database
  db = {...db, folders: []}
  db.quizzes = db.quizzes.map((quiz) => {
    return { ...quiz, folderId: null };
  });

   // Save the updated database
  fs.writeFileSync("db.json", JSON.stringify(db, null, 2));

  // Return the updated items
  res.status(200).send(db);
});

module.exports = router;