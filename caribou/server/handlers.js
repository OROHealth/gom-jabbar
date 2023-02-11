const { MongoClient } = require("mongodb");
const { userInfo } = require("os");

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

require("dotenv").config();
const { MONGO_URI } = process.env;

const getUser=async(req,res)=>{
    const {email,password} =req.params;
    const query={email:email,password:password};
    const client = new MongoClient(MONGO_URI, options);
try {
    await client.connect();
    const db = client.db("Caribou");
    const data = await db.collection("Account").find(query).toArray();
    if (data.length!=0) {
        res.status(200).json({
        status: 200,
        message:"Success",
        data: data,
        });
    }else{
        res.status(200).json({
            status: 200,
            message:"Invalid User",
            data: data,
        });
    } 
} catch (err) {
    res.status(400).json({
        status: 400,
        message: "Bad Request",
    });
    }
    client.close();
}

const addUser = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const newItem = req.body;
        const emailSplit=(newItem.email).split("@");
        const isEmailValid=emailSplit[0].endsWith('carib');
        await client.connect();
        const db = client.db("Caribou");

        if(isEmailValid==false){
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Email Invalid"
            });
        }
        else if(newItem.pass!==newItem.confirmPass){
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Please check your password"
            });
        }
        else if(isEmailValid==true && newItem.pass==newItem.confirmPass){
            await db.collection("Account").insertOne({email:newItem.email, password:newItem.pass});
            client.close();
            return res.status(200).json({
                status: 200,
                message: "Success",
                data: newItem,
            });
        }
        else{
            client.close();
            res.status(400).json({
                status: 400,
                message:"Invalid Data",
            });
        }

    } catch (err) {
        return res.status(400).json({ status: 400, message: "Invalid data!" });
    }
};

module.exports = {
    addUser,getUser
};