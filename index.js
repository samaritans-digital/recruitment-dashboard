const express = require("express")
const nunjucks = require("nunjucks")
const path = require("path")
const logger = require("morgan")
const router = require("./routers/router")
const filters = require("./utils/nunjucksFilters")
const basicAuth = require('express-basic-auth')

// Load env
require("dotenv").config()

// Init express
const server = express()
server.use(logger("dev"))

// View config
server.set("views", path.join(__dirname, "views"))
const nunjucksEnv = nunjucks.configure("views", {
    autoescape: true,
    express: server,
    watch: true // Slows things down
})
// Apply nunjucks filters
filters(nunjucksEnv)
server.set("view engine", "njk")

// Authentication
server.use(basicAuth({
    users: { [process.env.USER]: process.env.PASSWORD },
    challenge: true
}))

// Bind routes to URLs
server.use("/", router)
server.use(express.static("public"))
server.use((req, res)=>{
    res.status(404).render("404.njk")
})

// Listen for connections
const port = process.env.PORT || 4000
server.listen(port, ()=>{
    console.log(`✅  Server listening on port ${port}`)
})