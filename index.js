const express = require("express")
const nunjucks = require("nunjucks")
const path = require("path")
const logger = require("morgan")
const router = require("./routers/router")

// Load config
require("dotenv").config()

// Init express
const server = express()
// server.use(logger("dev"))

// View config
server.set("views", path.join(__dirname, "views"))
nunjucks.configure("views", {
    autoescape: true,
    express: server,
    watch: true
})
server.set("view engine", "njk")

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