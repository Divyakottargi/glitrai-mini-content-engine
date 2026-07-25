const pool = require("./config/db");

async function test() {
    try {
        const res = await pool.query("SELECT NOW()");
        console.log("✅ Database Connected");
        console.log(res.rows[0]);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

test();