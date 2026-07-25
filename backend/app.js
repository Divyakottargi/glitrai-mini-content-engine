const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

const jobRoutes = require("./routes/jobRoutes");

app.use("/", jobRoutes);

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Server Running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});