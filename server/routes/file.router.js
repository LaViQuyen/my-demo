const express = require("express");
const router = express.Router();
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const DateUtils = require("../utils/date.util");
const puppeteer = require("puppeteer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadDir = path.join(__dirname, "../upload");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    // Specify the directory where uploaded files will be stored
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Define the file name for the uploaded file
    cb(null, file.originalname.replace(/\s/g, ""));
  },
});
// Create an instance of Multer with the storage configuration
const upload = multer({ storage: storage });
router.post("/upload", upload.single("file"), (req, res) => {
  // Access uploaded file information using req.file
  if (req.file) {
    // File was uploaded successfully
    res.status(200).send({ fileName: req.file.filename });
  } else {
    // No file was uploaded or an error occurred
    res.status(400).send("No file uploaded or an error occurred.");
  }
});
router.get("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../upload", filename);
  console.log(filePath);
  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set the appropriate headers for file download
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Type", "application/octet-stream");
    // Create a read stream from the file and pipe it to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    // File not found
    res.status(404).send("File not found");
  }
});
router.delete("/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../upload", filename);
  // Delete the file
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).send("Failed to delete the file");
      }
      res.status(200).send({ message: "File removed successfully" });
    });
  } else {
    return res.status(200).send({ message: "File removed successfully" });
  }
});
router.post("/generate-pdf", async (req, res) => {
  try {
    const { type, htmlString, studentName, quizName } = req.body;
    const currentDate = DateUtils.getCurrentDate();
    const dir = path.join(
      __dirname,
      `../results/${studentName}_${quizName}_${currentDate}`,
    );
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const fileName = `${studentName}_${type}_${quizName}_${currentDate}.pdf`;
    const outputPath = path.join(dir, fileName);
    await (async () => {
      const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"],
      });
      const page = await browser.newPage();
      await page.setContent(htmlString); // Set the HTML content
      await page.pdf({
        path: outputPath,
        format: "A4", // Paper format
        printBackground: true,
      });
      await browser.close();
    })();
    res.status(200).json({ message: "Generate successfully" });
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
