import express from "express";
import { MongoClient, ServerApiVersion } from "mongodb";
import admin from "firebase-admin";
import fs from "fs";

//firebase admin configuration reading
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));

//initializing app with firebase admin package
admin.initializeApp({
  credential: admin.credential.cert(credentials), // entering credentials to app
});

//instance of express to handle networking
const app = express();

app.use(express.json());

let db; // data base

//connection to mongo data base
async function connectToDB() {
  const uri = "mongodb://127.0.0.1:27017"; // local uri for mongo data base

  //creation of mongo client
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect(); //connection to data base

  db = client.db("my-blog-db"); // inserting the data base with specific name to work across the server
}

//getting the article with specific name
app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params; // getting the name of desired article from url in req.params

  const article = await db.collection("articles").findOne({ name }); //getting the article itself by the name from data base "articles" collection

  res.json(article); // responding with JSON containing desired article
});

//getting all the articles
app.get("/api/articles", async (req, res) => {
  const articles = await db.collection("articles").find({}).toArray();
  res.json(articles);
});

//middlware to get the current user
app.use(async function (req, res, next) {
  const { authtoken } = req.headers; // authorisation token of user from request headers

  //if authtoken exists then we can get the user
  if (authtoken) {
    const user = await admin.auth().verifyIdToken(authtoken); // verifying if user exists in firebase auth
    req.user = user; // set user into request for post enpoints
    next(); //continue the application execution
  } else {
    res.sendStatus(400);
  }
});

// Function to update the article
async function updateArticle(name, update, res) {
  const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name }, // name of the article
    update, // update operation
    {
      returnDocument: "after", // return document after the updates
    }
  );
  res.json(updatedArticle);
}

// endpoint to upvote especial article
app.post("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params; // get the desired article from req.params
  const { uid } = req.user; // get user uid from req.user which was set inside app.use

  const article = await db.collection("articles").findOne({ name }); // search article in DB

  const upvoteIds = article.upvoteIds || []; // get all the users that upvoted article or create new array for future users
  const canUpvote = uid && !upvoteIds.includes(uid); // check if this user already upvoted this article or not

  // if user can upvote article then make changes in DB
  if (canUpvote) {
    await updateArticle(
      name,
      { $inc: { upvotes: 1 }, $push: { upvoteIds: uid } },
      res
    );
  } else {
    await updateArticle(
      name,
      { $inc: { upvotes: -1 }, $pull: { upvoteIds: uid } },
      res
    );
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params; //get the desired article from req.params
  const { id, postedBy, text } = req.body; // get user uid from req.user wich was set inside app.use
  const newComment = { id, postedBy, text }; //params of new created comment

  const updatedArticle = await db.collection("articles").findOneAndUpdate(
    { name }, //name of article
    { $push: { comments: newComment } }, //push new comment to the comments array in DB
    {
      returnDocument: "after", //return document after the updates
    }
  );

  res.json(updatedArticle);
});

//initialize the server
async function start() {
  await connectToDB(); //connection to data base
  //starting the server with callback
  app.listen(3001, function () {
    console.log("Server listening on port 3001");
  });
}

//start server
start();
