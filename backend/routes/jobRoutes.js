const express = require("express");
const router = express.Router();

const upload = require("../services/uploadService");

const {
    generateJob,
    getJob
} = require("../controllers/jobController");

router.post(
    "/generate",
    upload.single("productImage"),
    generateJob
);

router.get("/jobs/:id", getJob);

module.exports = router;