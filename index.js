const express = require("express")
const app = express()

const { Client } = require("pg")

const client = new Client({
    connectionString: process.env.URI,
    ssl: {
        rejectUnauthorized: false
      }
})
client.connect()

app.get("/", async(req, res) => {
    res.json("Hellow")
})

app.get("/read-data", async(req, res) => {
    client.query("SELECT * FROM users", (error, result) => {
        if(error){
            return res.json(error)
        }
        res.json(result.rows)
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Running server at port 3000...");
})
