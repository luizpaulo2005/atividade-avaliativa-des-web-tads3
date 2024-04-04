import express from 'express'
import cors from 'cors';
import morgan from 'morgan';
import { jobsRoutes } from './routes/jobs.js';

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use(cors())
app.use(morgan('dev'))

app.use("/jobs", jobsRoutes)

app.get("/hello", async (req, res) => {
    // res.status(200).send("Hello World")
    res.render("hello")
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})