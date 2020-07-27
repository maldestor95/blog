const express = require('express')
const cors = require('cors')

const port=2222
const app= express()
app.use(cors())

app.get('/*',express.static('src/md'))
app.listen(port,function(){console.log(`Server starter on ${port}`)})