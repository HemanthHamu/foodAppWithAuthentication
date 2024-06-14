import express from 'express';
import cors from 'cors'
import connectToMongoDB from './database/connectToMongoDB.js';
import Userclass from './models/userModel.js';
import nodemailer from 'nodemailer'
import dotenv from 'dotenv';
import createCookie from './cookie/createCookie.js';
import bcrypt from 'bcrypt'
const port = 4010;
dotenv.config()
const app = express();
//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin : 'http://localhost:5173',
    credentials:true
}))
app.get('/',(req,res) => {
    res.send("Hi from backend")
})
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"patiencecoder@gmail.com",
        pass:process.env.PASS
    }
})
transporter.verify((err,success)=>{
    if(err) {
        console.log(err)
    }
    else{
        console.log("Nodemailer Connection Successful")
    }
})

//ROUTE FOR CHECKING REGISTRATION
app.post('/registrationcheck',async(req,res) => {
    const {username,email,password} = req.body
    try {
        const checkEmail =  await Userclass.findOne({email});
        if(checkEmail){
            return res.status(409).json({message:"Email already exists"})
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const otp = Math.floor(1000 + Math.random() * 9000)
        const newUser = new Userclass({
            username:username,
            email:email,
            password:hashedPassword,
            otp:otp
        })
        const mailOptions = {
            from:"patiencecoder@gmail.com",
            to:email,
            subject:"OTP for Registrations",
            html: `
            <div style="background-color:#242424;color:white;padding:20px;border-radius:10px;text-align:center;">
                <p>Hi ${username}</p>
                <p>Your OTP for creating an account is ${otp}</p>
            </div>
            `
        }
        transporter.sendMail(mailOptions,(err,success)=>{
            if(err){
                console.log(err)
            }
            else{
                return res.status(200).json({message:"OTP Sent"})
            }
        })
        await newUser.save();
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
})
//ROUTE FOR CHECKING OTP
app.post('/verificationcheck',async (req,res) => {
    const userOtp = parseInt(req.body.otp);
    try {
        const checkOtp =  await Userclass.findOne({otp:userOtp})
        if(checkOtp && checkOtp.otp!==undefined && checkOtp.otp===userOtp){
            return res.status(200).json({message:"OTP Verified"})
        }
        return res.status(400).json({error:"Incorrect OTP"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal Server Error"})
    }
})
//ROUTE FOR CHECKING LOGIN
app.post('/logincheck',async(req,res) => {
    try{
    const {email,password} = req.body;
    const findUserMail = await Userclass.findOne({email});
    const comparePassword = await bcrypt.compare(password,findUserMail.password)
    if(findUserMail && comparePassword){
        const token = createCookie(findUserMail._id,res);
        return res.status(200).json({message:"User Logged in",token})
    }
    else{
        return res.status(401).json({message:"Invalid email or password"})
    }
}
catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
})
//ROUTE FOR RESET PASSWORD
app.post('/forgot-password',async(req,res) => {
    const {email,newPassword} = req.body;
    try{
        const findMail = await Userclass.findOne({email});
        if(!findMail){
            return res.status(401).json({message:"Email not found"})
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        findMail.password = hashedPassword;
        await findMail.save();
        return res.status(200).json({message:"Password changed succesfully"})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error:"Internal Server Error"})
    }
})
//ROUTE FOR LOGOUT THE USER
app.post('/logout',(req,res) => {
    try{
        res.cookie('jwt',"",{
            maxAge:0
        });
        return res.status(200).json({message:"Logout Successful"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"Internal Server Error"})
    }
})

app.listen(port,() => {
    console.log("Server started");
    connectToMongoDB()
})