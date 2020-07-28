const express = require('express')
const cors = require('cors')

const port=2222
const app= express()
app.use(cors())
const trace =function(req,res,next)
{console.log(req.originalUrl)
    next()
    // console.log(__dirname)
    // console.log(__dirname.replace('src\\dev','src\\md'))
}
    app.use(trace,express.static(__dirname.replace('src\\dev','src\\md')))
app.listen(port,function(){console.log(`Server starter on ${port}`)})