const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const stripe = require("stripe")(process.env.STRIPE_SECRET);



// Middle Ware 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.guif9pr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Token verify function
function verifyJWT(req, res, next) {
   const authHeader = req.headers.authorization;
   if (!authHeader) {
      return res.status(401).send('Unauthorized Access');
   }

   const token = authHeader.split(' ')[1];
   jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
      if (err) {
         return res.status(403).send({ message: 'Forbidden Access' });
      }
      req.decoded = decoded;
      next();
   })
}



async function run() {
   try {
      const bikeCollection = client.db('Bike').collection('allBikes');
      const bestSellsCollection = client.db('Bike').collection('bestSells');
      const usersCollection = client.db('Bike').collection('users');
      const ordersCollection = client.db('Bike').collection('orders');
      const wishlistCollection = client.db('Bike').collection('wishlist');



      // Get Token
      app.get('/jwt', async (req, res) => {
         const email = req.query.email;
         const query = { email: email };
         const user = await usersCollection.findOne(query);
         if (user) {
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN);
            return res.send({ accessToken: token });
         }
         res.status(403).send({ accessToken: '' });
      });

      // Verify Admin 
      const verifyAdmin = async (req, res, next) => {
         const decodedEmail = req.decoded.email;
         const query = { email: decodedEmail };
         const user = await usersCollection.findOne(query);
         if (user?.role !== 'Admin') {
            return res.status(403).send({ message: 'Forbidden access' })
         }

         next();
      }

      // create User 
      app.post('/users', async (req, res) => {
         const user = req.body;
         const email = user.email;
         const query = { email: email };
         const find = await usersCollection.findOne(query);

         if (find) {
            const token = jwt.sign({ email }, process.env.ACCESS_TOKEN);
            return res.send({ accessToken: token });
         };

         const result = await usersCollection.insertOne(user);
         res.send(result);
      })

      // Create Bike 
      app.post('/bikes', verifyJWT, async (req, res) => {
         const bike = req.body;
         const result = await bikeCollection.insertOne(bike);
         res.send(result);
      })

      // Get Bikes  By brand Categories
      app.get('/bikes/:brand', async (req, res) => {
         const brand = req.params.brand;
         const query = { brand: brand };
         const result = await bikeCollection.find(query).toArray();
         res.send(result);
      })

      // Get Bikes  By Email
      app.get('/bikes', verifyJWT, async (req, res) => {
         const email = req.query.email;
         const decodedEmail = req.decoded?.email;
         if (email !== decodedEmail) {
            return res.status(403).send({ message: 'Forbidden Access' });
         }
         const query = { sellerEmail: email }
         const result = await bikeCollection.find(query).toArray();
         res.send(result);
      })

      // Get Advertised Bike 
      app.get('/advertiseBikes', verifyJWT, async (req, res) => {
         const query = { productStatus: "Advertise" }
         const bikes = await bikeCollection.find(query).toArray();
         res.send(bikes);
      })



      /* <------------------------------------------- Payment -----------------------------------------> */


      app.post("/create-payment-intent", verifyJWT, async (req, res) => {
         const bike = req.body;
         const price = bike.rslPrice;
         const amount = price * 100;

         // Create a PaymentIntent with the order amount and currency
         const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            "payment_method_types": [
               "card"
            ],
         });

         res.send({
            clientSecret: paymentIntent.client_secret,
         });
      });




      /* <------------------------------------------- Buyer section Start -----------------------------------------> */
      // check Buyer 
      app.get('/users/buyer/:email', async (req, res) => {
         const email = req.params.email;
         const query = { email };
         const user = await usersCollection.findOne(query);
         res.send({ isBuyer: user?.role === 'Buyer' })
      })

      // Create Order 
      app.post('/orders', verifyJWT, async (req, res) => {
         const query = req.body;
         const order = await ordersCollection.insertOne(query);
         res.send(order)
      })

      // Get Order 
      app.get('/orders', verifyJWT, async (req, res) => {
         const email = req.query.email;
         const query = { buyerEmail: email };
         const result = await ordersCollection.find(query).toArray();
         res.send(result);
      })

      // Delete Order 
      app.delete('/orders/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const result = await ordersCollection.deleteOne(query);
         res.send(result);
      })

      // Get Product by id 
      app.get('/payBike/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const result = await bikeCollection.findOne(query);
         res.send(result);
      })


      /*  <------------------------------------------- Seller section Start -----------------------------------------> */
      // check Seller 
      app.get('/users/seller/:email', async (req, res) => {
         const email = req.params.email;
         const query = { email };
         const user = await usersCollection.findOne(query);
         res.send({ isSeller: user?.role === 'Seller' })
      })

      // Delete Seller's Product
      app.delete('/bikes/:id', verifyJWT, async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) }
         const result = await bikeCollection.deleteOne(query);
         res.send(result);
      })

      // Update Product Status 
      app.put('/bikes/:id', verifyJWT, async (req, res) => {
         const id = req.params.id;
         const setStatus = req.body.status;
         const filter = { _id: ObjectId(id) };
         const options = { upsert: true };
         const updateDoc = {
            $set: {
               productStatus: setStatus
            }
         }
         const result = await bikeCollection.updateOne(filter, updateDoc, options);
         res.send(result)
      })

      // Filter verify seller 
      app.get('/usersVerify', verifyJWT, async (req, res) => {
         const email = req.query.email;
         const query = { email: email }
         const find = await usersCollection.findOne(query);
         if (find.sellerVerify === "Verified") {
            return res.send(true);
         }
         res.send(false);
      })



      /*  <-----------------------------------------Admin section Start---------------------------------------------> */
      // check Admin 
      app.get('/users/admin/:email', async (req, res) => {
         const email = req.params.email;
         const query = { email };
         const user = await usersCollection.findOne(query);
         res.send({ isAdmin: user?.role === 'Admin' })
      })

      // Get Users For Admin 
      app.get('/users', verifyJWT, verifyAdmin, async (req, res) => {
         const roleName = req.query.role;
         const filter = { role: roleName };
         const cursor = await usersCollection.find(filter).toArray();
         res.send(cursor);
      })

      // change Role 
      app.put('/users/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
         const id = req.params.id;
         const setRole = req.body.role;
         const filter = { _id: ObjectId(id) };
         const options = { upsert: true };
         const updateDoc = {
            $set: {
               role: setRole
            }
         }
         const result = await usersCollection.updateOne(filter, updateDoc, options);
         res.send(result)
      })

      // Verify Seller
      app.put('/usersVerify/admin/:id', verifyJWT, verifyAdmin, async (req, res) => {
         const id = req.params.id;
         const verifyInfo = req.body.sellerVerify;
         const filter = { _id: ObjectId(id) };
         const options = { upsert: true };
         const updateDoc = {
            $set: {
               sellerVerify: verifyInfo
            }
         }
         const result = await usersCollection.updateOne(filter, updateDoc, options);
         res.send(result)
      })

      // Delete Users
      app.delete('/users/:id', verifyJWT, verifyAdmin, async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const result = await usersCollection.deleteOne(query);
         res.send(result);
      })

      /*  <--------------------------------------End----------------------------------------------> */



      // Best Sells 
      app.get('/history', async (req, res) => {
         const query = {};
         const result = await bestSellsCollection.find(query).toArray();
         res.send(result);
      })


      /*  <--------------------------------------wishlist----------------------------------------------> */

      // Add on wishlistCollection
      app.post('/wishlists', verifyJWT, async (req, res) => {
         const wish = req.body;
         const query = { wishProduct: wish?.wishProduct };

         const find = await wishlistCollection.findOne(query);

         if (find) {
            return;
         };
         const result = await wishlistCollection.insertOne(wish);
         res.send(result);
      })

      // Get from wishlistCollection
      app.get('/wishlists', verifyJWT, async (req, res) => {
         const email = req.query.email;
         const query = { wisher: email };
         const result = await wishlistCollection.find(query).toArray();
         res.send(result);
      })

      app.get('/wishesProduct/:id', async (req, res) => {
         const id = req.params.id;
         const query = { _id: ObjectId(id) };
         const result = await bikeCollection.findOne(query);
         res.send(result);
      })


   }
   finally {
   }


}
run().catch(er => console.log(er));





app.get('/', (req, res) => {
   res.send('Bike server is running.')
})

app.listen(port, () => {
   console.log(port, 'is running.');
})