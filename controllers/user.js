const express = require('express');
const UsersDB=require('../schemas/users.js');
const messageDB=require('../schemas/messages.js');
const relationsDB=require('../schemas/relations.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
jwtkey="dde2a7ab1501ece90794ccdc6e2db7744b1a6425dea17fe2697510f3232ce41f";

exports.postSignup = async (req, res) => {

   const phone=req.body.phone
   const name=req.body.name
   const password=req.body.password
   const confirm=req.body.confirm

if(password !== confirm)
{
    return res.status(400).json({error: 'Passwords do not match'});
}
if (!phone) {
return res.status(400).json({error:"please enter your phone"});
}
if (!name) {
    return res.status(400).json({error:"please enter your name"});
}
if (!password) {
    return res.status(400).json({error:"please enter your password"}); 
}
if (!confirm) {
    return res.status(400).json({error:"please confirm your password"});
}

const isuser=await UsersDB.find({phone:phone})
if (isuser.length>0)
{
    return res.status(400).json({error:"the user is alredy taken !"});
}


if (password === confirm)
{
   const hashpassword=req.body.password
   bcrypt.hash(hashpassword, 5, async(err, hash) => {
    if (err) {
        console.log("hash failed");
        return;
    }
    req.body.password = hash;
    const addedUser = new UsersDB(req.body);
    addedUser.save()
    .then(() => {
        
        res.status(201).json({massage:"User created successfully"})
        
    })
})
}}

exports.postsignin= async (req,res)=>{
    const phone=req.body.phone
    const password=req.body.password

    if (!phone) {
        return res.status(400).json({error:"please enter your phone"});
    }
    if (!password) {
        return res.status(400).json({error:"please enter your password"});
    }

    user=await UsersDB.findOne({phone:phone})
    
    if (!user) {
        return res.status(400).json({error:"user not found"});
    }

    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            console.error('Error comparing passwords:', err);
            return;
        }

        if (result)
        {

            const token = jwt.sign({id:user._id,phone:user.phone,name:user.name}, jwtkey, { expiresIn: '1h' });
            res.status(200).json({massage:"user login successfully",token:token})
            


        }
        else
        {
            res.status(401).json({error:"incorrect password"})
        }
    })
}


exports.getuser=async(req,res)=>
{
    const search = req.query.search;
    const results = await UsersDB.find({ name: { $regex: search, $options: "i" } }).select('-password').select('-__v');
    res.status(200).json({users:results})
}

exports.getchat=async(req,res,next)=>{
    const clickedID=req.query.userID
    const auth=req.headers['authorization'];
    if(!auth)
    {
            return res.status(401).json({error:"auth header is required"});
    }
    const token=auth.split(" ")[1];
    console.log(token)
    try
    {
        const decode=jwt.verify(token,jwtkey);
        //console.log({"decoded token":decode});
        
        const myid=decode.id
        //console.log(myid)
        const messages=await messageDB.find({
        $or: [
        { senderID: myid, reciverID: clickedID },
        { senderID: clickedID, reciverID: myid }]})

        const filter=messages.map(msg => ({
            message: msg.messages,  
            senderID: msg.senderID
        }))

        res.status(200).json({message:filter})
        
        
        
    }
    catch(err)
    {
        
        return res.status(401).json({error:"invalid token"});
        
    }

    




    
}
