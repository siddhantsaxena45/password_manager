import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'
import cors from 'cors'
const app = express()
app.use(bodyParser.json()); 
app.use(cors())

const port = 3000
// Connection URL
const url = process.env.MONGO_URI;
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

client.connect();

app.get('/', async (req, res) => {
  
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

app.post('/', async (req, res) => {
  const password = req.body
   const db = client.db(dbName);
  const collection = db.collection('passwords');
   const findResult = await collection.insertOne(password);
  res.send({success: true , result: findResult})
})

app.delete('/', async (req, res) => {
  const password= req.body
   const db = client.db(dbName);
  const collection = db.collection('passwords');
   const findResult = await collection.deleteOne(password);
  res.send({success: true , result: findResult})
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
