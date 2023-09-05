import mongoose from "mongoose";

const dbconn = async()=>{
    try {
        
        let conn = await mongoose.connect(process.env.MONGOS_URL)
        console.log(`Database connected Successfully ${mongoose.connection.host}`)


    } catch (error) {

        console.log("Error in DB connection")
        
    }
}

export default dbconn