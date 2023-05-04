const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${conn.connection.host}`) // retrieves host server name
    }
    catch {
        console.log(error)
        process.exit(1) // this forces node to stop trying to reach the database in the event of an error
    }
}

module.exports = connectDB