import mongoose from "mongoose";


const checkoutSchema = new mongoose.Schema(
    
    {
        userE: String,
        tprice: String,

    products:[

            {
                title: String,
                qnty: String,
                userE: String,
                updatedAt: String,      
            }
        ]
        

        }
    


)

export default mongoose.model("checkout",checkoutSchema)