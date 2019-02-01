const express = require("express")
const session = require("express-session")
const nunjucks = require("nunjucks")
const path = require("path")
const logger = require("morgan")
const bodyParser = require("body-parser")
const enforce = require("express-sslify")
const passwordless = require("passwordless")
const PostgreStore = require("passwordless-postgrestore")

const router = require("./routers/router")
const filters = require("./utils/nunjucksFilters")
const emails = require("./utils/emails")

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

// Parse post responses
server.use(bodyParser.urlencoded({ extended: false }))

// Auth
passwordless.init(new PostgreStore(process.env.DATABASE_URL))
passwordless.addDelivery((tokenToSend, uidToSend, recipient, callback) => {
    // Send out a token
    emails.sendEmail(tokenToSend, uidToSend, recipient)
    callback()
})
server.use(passwordless.acceptToken())
server.use(session({
    secret: process.env.SESSION_SECRET,
    store: new (require("connect-pg-simple")(session))()
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