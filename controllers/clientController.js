import Product from "../models/productModel.js"
import contactModel from "../models/contactModel.js"
import CheckoutModel from "../models/CheckoutModel.js"

  

  // getting Data from MongoDb

  export const displayProducts = async(req, res)=>{
    let pData = await Product.find();        
    if(pData.length>0){
        res.send(pData)
    }else{
        res.send({msg: "No record available here"})
    }
}


export const addContact = async (req,res)=>{

    try {
    
        const {name,email,subject,messages}= req.body
    
    
        // validation / user fill all details
        if(!name){
            return res.send({message:"User name is required"})
        }
        if(!email){
            return res.send({message:"User mail is required"})
        }
        if(!subject){
            return res.send({message:"Subject is required"})
        }
        if(!messages){
            return res.send({message:"User message is required"})
        }
        
       let user = await new contactModel({name,email,subject,messages}).save()
       res.status(201).send({
        success: true,
        messgae: "Messgae Send Successfully",
        user
       })
        
    } catch (error) {
    
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Messgae Sending",
            error
        })
        
    }}



 export const addCheckout = async (req, res) => {
     try {
       const productsData = req.body.carts;
       const email = req.body.userE;
       const price = req.body.tprice;
  
       // Save the array of products to MongoDB
       await CheckoutModel.create({ tprice: price, userE: email, products: productsData });
  
       res.status(201).json({ message: 'Data saved successfully' });
     } catch (error) {
       res.status(500).json({ error: 'Error saving data' });
     }
   };


   export const getCheckout = async (req, res) => {
    try {
      const checkoutData = await CheckoutModel.find();
      res.status(200).json(checkoutData);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving data' });
    }
  };