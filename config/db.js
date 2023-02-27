const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const dbname='doc_app';
const connection = async () => {
 let client =new MongoClient(url);
 let result= await client.connect();
 let db=  result.db(dbname);
 return db.collection("User");
};
connection();
module.exports = connection;