const { Mongoose, default: mongoose } = require("mongoose");
mongoose.set('strictQuery', false);

const url = "mongodb://localhost:27017/doc_app";
const dbname='doc_app';
const connection = async () => {
//  let client =new MongoClient(url);
//  let result= await client.connect();
//  let db=  result.db(dbname);
//  return db.collection("User");
try {
    await mongoose.connect(url,{useNewUrlParser: true});
    // console.log(`Mongodb connected ${mongoose.connection.host}`);
} catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
}
};
connection();
module.exports = connection;