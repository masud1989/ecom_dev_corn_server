const { default: mongoose } = require("mongoose")

exports.dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URL)
        console.log('Database Connected Successful')
    } catch (error) {
        console.log('Database Error')
    }
}