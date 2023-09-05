import express from "express";
import { addProduct, productList, deleteProduct, singleProduct, updateProduct, userList,deleteUser, singleUser, updateUser, userMessages, deleteMessage } from "../controllers/adminController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import multer from "multer"




const router = express.Router()
const app = express();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  });
  const upload = multer({ storage: storage });

app.use('/uploads', express.static('uploads'));


// Upload endpoint
router.post('/upload', upload.single('image'), requireSignIn, isAdmin, addProduct)



//__________________________

// Fetch all images endpoint
router.get('/images', requireSignIn, isAdmin, productList)

//______________________________________________________________________________

// METHOD GET & ad product
router.post("/addproduct", requireSignIn, isAdmin, addProduct)

// getting Data from MongoDb

router.get("/productlist", requireSignIn, isAdmin, productList)

// deleting added note
router.delete("/deleteproduct/:id", requireSignIn, isAdmin, deleteProduct)

// Getting note from MongoDb on the basis of Id
router.get("/singleproduct/:id", requireSignIn, isAdmin, singleProduct)

// updating note data

router.put("/updateproduct/:id", requireSignIn, isAdmin, updateProduct)

// getting Data from MongoDb

router.get("/userlist", requireSignIn, isAdmin, userList)

// deleting added user
router.delete("/deleteuser/:id", requireSignIn, isAdmin, deleteUser)


// Getting note from MongoDb on the basis of Id
router.get("/singleuser/:id", requireSignIn, isAdmin, singleUser)

// updating user data

router.put("/updateuser/:id", requireSignIn, isAdmin, updateUser)


// getting Messages from MongoDb

router.get("/messages", requireSignIn, isAdmin, userMessages)

// deleting Message
router.delete("/deletemessage/:id", requireSignIn, isAdmin, deleteMessage)



export default router;
