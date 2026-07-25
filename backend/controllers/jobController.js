const { v4: uuidv4 } = require("uuid");
const pool = require("../config/db");
const { generateImagePrompt } = require("../services/llmService");

exports.generateJob = async (req, res) => {
    try {
        const { product_name, description } = req.body;

        const imagePath = req.file
            ? `/uploads/${req.file.filename}`
            : null;

        // Generate AI prompt using Gemini
        const prompt = await generateImagePrompt(
            product_name,
            description
        );

        const id = uuidv4();

        await pool.query(
            `INSERT INTO jobs
            (id, product_name, description, prompt, image_url, status)
            VALUES ($1,$2,$3,$4,$5,$6)`,
            [
                id,
                product_name,
                description,
                prompt,
                imagePath,
                "completed"
            ]
        );

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            jobId: id,
            prompt,
            image: imagePath
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getJob = async (req, res) => {
    try {

        const { id } = req.params;

        const result = await pool.query(
            "SELECT * FROM jobs WHERE id=$1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        res.json(result.rows[0]);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
};