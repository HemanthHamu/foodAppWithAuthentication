import jwt from 'jsonwebtoken';
export default function createCookie(userID,res){
    const token = jwt.sign({userID},process.env.JWT_SECRET);
    console.log(token)
    res.cookie('jwt',token,{
        maxAge: 100000000, 
		httpOnly: true, 
		sameSite: "strict",
		secure: process.env.NODE_ENV !== "development",
    })
}