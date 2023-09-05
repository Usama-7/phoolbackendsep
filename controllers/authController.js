import userModel from "../models/userModel.js"
import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import JWT from "jsonwebtoken"


export const registerController = async (req,res)=>{

try {

    const {name,email,password,phone,address}= req.body


    // validation / user fill all details
    if(!name){
        return res.send({message:"User name is required"})
    }
    if(!email){
        return res.send({message:"User mail is required"})
    }
    if(!password){
        return res.send({message:"Password is required"})
    }
    if(!address){
        return res.send({message:"User address is required"})
    }
    if(!phone){
        return res.send({message:"User Phone Number is required"})
    }

    // check is user already register or not

    let existingUser = await userModel.findOne({email})
    if(existingUser)
    {
        return res.status(200).send({
            success: true,
            message: "User already registeerd"
        })
    }

    // hash password

    const hashedPassword = await hashPassword(password)

   let user = await new userModel({name,email,phone,address,password: hashedPassword}).save()

   const token = await JWT.sign({_id : user._id}, process.env.JWT_KEY, { expiresIn: "1d"});

   res.status(201).send({
    success: true,
    messgae: "User Register Successfully",
    token,
    user
   })

    
} catch (error) {

    console.log(error)
    res.status(500).send({
        success: false,
        message: "Error in Registration",
        error
    })
    
}

// login controller



}


export const loginController = async (req,res)=>{

    try {

        const {email,password} = req.body

        if(!email || !password)
        {
            return res.send( {message: "Email and Password Required"}
            )
        }

        const user = await userModel.findOne({email})

        if(!user){
            return res.send({message: "Invalid email or password"})
        }

        const match = await comparePassword(password, user.password)

        if(!match){
            return res.send({message: "Invalid password"})
        }



        const token = await JWT.sign({_id : user._id}, process.env.JWT_KEY, { expiresIn: "1d"});

        res.status(201).send({
         success: true,
        message: "Login Successful",
         user:{
         name: user.name,
         email: user.email,
         phone: user.phone,
         role: user.role,
       address: user.address,
       _id: user._id
       },
        token
       })

        

        
    } catch (error) {
        console.log(error)
    }
    
    }
    