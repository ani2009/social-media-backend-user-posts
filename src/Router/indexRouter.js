const express = require("express")
const indexRouter = express.Router()
const app = express()

const postRouter = require('./postRouter')  

indexRouter.use("/post",postRouter)

module.exports = indexRouter