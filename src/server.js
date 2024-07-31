import express from "express";
import "dotenv/config"
import {dbConnection} from "./database/db.js"
import router from "./routes/router.js"

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 4001;

app.get("/api/healty", (req,res) => {
    res.status(200).json(
        {
            success: true,
            message: "server is healty"
        }
    )
});

app.use ("/api", router);

dbConnection()
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
.catch(error => {
    console.log(error)
})
