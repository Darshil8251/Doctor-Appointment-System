const { Mongoose, default: mongoose } = require("mongoose");
mongoose.set('strictQuery', false);


const dbname='doc_app';
const url = "mongodb+srv://Darshil8251:Darshil8251@cluster0.ybuywdn.mongodb.net/doc_app";
const connection = async () => {

try {
    await mongoose.connect(url,{useNewUrlParser: true});
} catch (error) {
    console.log(`Mongodb Server Issue ${error}`);
}
};
connection();
module.exports = connection;