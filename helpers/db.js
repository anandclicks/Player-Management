const mongoose = require('mongoose')
const connect_db = async()=>{
  try {
    await mongoose.connect(process.env.MONGO_DB_URI).then(()=> console.log("Databse has connected!"))
  } catch (error) {
    next(error)
    process.exit(1);
  }
}

module.exports = connect_db