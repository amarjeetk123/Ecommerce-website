const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const morgan = require("morgan")

const userRoutes = require("./routes/userRoutes")

const app = express()

// all the middleare
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())
//morgan logger - it is also a middleware
app.use(morgan('tiny'))


app.use("/" ,userRoutes )

module.exports = app ;