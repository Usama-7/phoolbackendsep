import userModel from "../models/userModel.js"
import productModel from "../models/productModel.js"
import contactModel from "../models/contactModel.js"
import fs from 'fs';





export const adminController = (req,res) =>{
    res.send("You are admin")
  }

// Configure Multer storage



export const addProduct = async (req, res) => {
  try {
    const { title, disc, price, catagory } = req.body;
    const { filename } = req.file;

    // Create a new image document
    const image = new productModel({
      title,
      disc,
      price,
      catagory,
      filename
    });

    // Save the image document to MongoDB
    await image.save();

    res.status(200).json({ message: 'Image uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while uploading the image.' });
  }
};


  // Fetch all images endpoint
  export const productList = async (req, res) => {
  try {
    const images = await productModel.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the images.' });
  }
};


  // getting Data from MongoDb

export const productList1 = async(req, res)=>{
  let nData = await productModel.find();        
  if(nData.length>0){
      res.send(nData)
  }else{
      res.send({msg: "No record available here"})
  }
}
  

// deleting added product
// export const deleteProduct = async(req,res)=>{ 
  
  

//   let delUser = await productModel.deleteOne({_id: req.params.id})
//   res.send(delUser)

// }

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productModel.findByIdAndRemove(id);

    if (deletedProduct) {
      // delete the corresponding image file
      const imagePath = `./uploads/${deletedProduct.filename}`;
      fs.unlinkSync(imagePath);

      res.json(deletedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "failed to delete product" });
  }
};








// Getting note from MongoDb on the basis of Id
export const singleProduct = async(req,res)=>
{
    let result = await productModel.findOne({_id: req.params.id})
    console.log("result_______wrong id ____+++___", result)
    
    res.send(result) 
   
    
}

// updating product

// export const updateProduct = async(req,res)=>{
//   let result = await productModel.updateOne(        
//           {_id: req.params.id},
//           {$set: req.body}                  
//   )
//   res.send(result)
// }






// update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title,disc,price,catagory, filename } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        title,
        disc,
        price,
        catagory,
        filename
      },
      { new: true }
    );
    console.log("file________________:", req.body)
    console.log("file________________:", req.file)

    if (updatedProduct) {
      // Check if a new image is uploaded
      if (req.file) {
        // Delete the previous image if it exists
        if (updatedProduct.filename) {
          fs.unlinkSync("uploads/" + updatedProduct.filename);
        }
        // Update the image field with the new filename
        updatedProduct.filename = req.file.filename;
        await updatedProduct.save();
      }
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
};







// getting Data from MongoDb

export const userList = async(req, res)=>{
  let nData = await userModel.find();        
  if(nData.length>0){
      res.send(nData)
  }else{
      res.send({msg: "No record available here"})
  }
}



// deleting added note
export const deleteUser = async(req,res)=>{ 
  let delUser = await userModel.deleteOne({_id: req.params.id})
  res.send(delUser)

}



// Getting note from MongoDb on the basis of Id
export const singleUser = async(req,res)=>
{
    let result = await userModel.findOne({_id: req.params.id})
    res.send(result) 
}


// updating user

export const updateUser = async(req,res)=>{
  let result = await userModel.updateOne(        
          {_id: req.params.id},
          {$set: req.body}                  
  )
  res.send(result)
}


// getting Data from MongoDb

export const userMessages = async(req, res)=>{
  let nData = await contactModel.find();        
  if(nData.length>0){
      res.send(nData)
  }else{
      res.send({msg: "No record available here"})
  }
}


// deleting added note
export const deleteMessage = async(req,res)=>{ 
  let delUser = await contactModel.deleteOne({_id: req.params.id})
  res.send(delUser)

}








