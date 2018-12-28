const express = require("express")
const logger = require("morgan")
const router = require("./routers/router")

// Load config
require("dotenv").config()

// Init express
const server = express()
server.use(logger("dev"))

// Bind routes to URLs
server.use("/", router)
server.use(express.static("public"))
server.use((req, res)=>{
    res.status(404).send("Route not found")
})

// Listen for connections
const port = process.env.PORT || 4000
server.listen(port, ()=>{
    console.log(`✅  Server listening on port ${port}`)
})

const Enquiry = require('./models').Enquiry

Enquiry.findByPk(2)
    .then(data=>console.log(data))