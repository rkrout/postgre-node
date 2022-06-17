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

app.get("/create-table", async(req, res) => {
    client.query("CREATE TABLE IF NOT EXISTS users (name VARCHAR(20), email VARCHAR(20))", (error, result) => {
        if(error){
            return res.json(error)
        }
        res.json(result)
    })
})

app.get("/insert-data", async(req, res) => {
    client.query("INSERT INTO users (name, email) VALUES ('rajesh', 'rajesh@rajesh.com')", (error, result) => {
        if(error){
            return res.json(error)
        }
        res.json(result)
    })
})

app.get("/read-data", async(req, res) => {
    client.query("SELECT * FROM users", (error, result) => {
        if(error){
            return res.json(error)
        }
        res.json(result)
    })
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Running server at port 3000...");
})
