const express = require('express')
const env = require('dotenv').config()
const app = express()
const bodyParser = require('body-parser')
const connect_db = require('./helpers/db')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.get('/',(req,res)=>{
  return res.json({
    "message" : "Api is Working!"
  })
})




// Server activation and database connection
try {
  const PORT = process.env.PORT || 8001
  connect_db().then(()=> app.listen(PORT)).then(()=> console.log(`Server is running at ${PORT}`)
  )
} catch (error) {
  console.log(error);
}

