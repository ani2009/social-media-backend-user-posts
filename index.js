    const express = require("express")
    const app = express()
    const port = 8000
    app.use(express.json())
    require("dotenv").config();
    const indexRouter = require('./src/Router/indexRouter')


    app.use("/",indexRouter)

    app.listen((port),()=>{
        console.log("server listening to the post......"+port)
    })

