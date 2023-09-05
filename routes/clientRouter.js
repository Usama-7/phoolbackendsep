import express from "express";
import { displayProducts, addContact, addCheckout, getCheckout } from "../controllers/clientController.js";
import {isClient, requireSignIn } from "../middleware/authMiddleware.js";
import { productList } from "../controllers/adminController.js";
import { singleProduct } from "../controllers/adminController.js";


 const router = express.Router()
 router.use(express.json())

// METHOD GET & Dummy
router.get("/products", requireSignIn, isClient, displayProducts)

// display products data
router.get('/imageshow',  productList)


// Getting note from MongoDb on the basis of Id
router.get("/singleproduct/:id", singleProduct)

// Contact add
router.post("/addcontact", addContact )


// add checkout request
router.post("/addcheckout", addCheckout)

// get checkout requests
router.get("/getcheckout", getCheckout)



// stripe payment method

import stripe from 'stripe';

const stripeInstance = stripe('sk_test_51NI78tApKD4haOvDSNbL9594leuzmxvtbhK1OqZ482pmiJ9PPtTFOHTqu6dmGzCOSobacRB44foBG4tVIX6MBwbs002Zw8bCR9');

router.post('/charge', async (req, res) => {
    try {
      const { token, amount } = req.body;
      const charge = await stripeInstance.charges.create({
        amount,
        currency: 'PKR',
        source: token.id,
        description: 'Payment Description',
      });
  
      // Handle the charge response as needed
      // Return a success message to the client
      res.send({ message: 'Payment successful' });
    } catch (error) {
      // Handle any errors that occur during the payment process
      res.status(500).send({ error: 'Payment failed' });
    }
  });
  


export default router;