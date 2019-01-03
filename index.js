const express = require("express")
const nunjucks = require("nunjucks")
const path = require("path")
const logger = require("morgan")
const basicAuth = require("express-basic-auth")
const enforce = require("express-sslify")
const router = require("./routers/router")
const filters = require("./utils/nunjucksFilters")

// Load env
require("dotenv").config()
const nodeEnv = process.env.NODE_ENV || "development"

// Init express and redirect to HTTPS in production
const server = express()
server.use(logger("dev"))
if(nodeEnv === "production"){
    server.use(enforce.HTTPS({ trustProtoHeader: true }))
}

// View config
server.set("views", path.join(__dirname, "views"))
let options = {
    autoescape: true,
    express: server
}
if(nodeEnv !== "production"){
    options.watch = true // Slows things down
}
const nunjucksEnv = nunjucks.configure("views", options)
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
const port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log(`✅  Server listening on port ${port}`)
})