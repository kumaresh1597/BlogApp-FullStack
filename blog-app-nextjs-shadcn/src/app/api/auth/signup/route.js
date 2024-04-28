import { hash } from 'bcrypt';
import connectDb from '@/utils/database';
import User from '@/models/UserSchema';
import { NextResponse } from "next/server";
import validator from 'validator';

export const POST = async (req,res)=>{
    try {

        await connectDb();

        const data  = await req.json()
        console.log(data)

        const {name,username,email,password} = data;

            try{

                await validateUserRegisterationData({name,username,email,password});
        
            } catch(err){
                return NextResponse.json({
                    status : 400,
                    message : "User data error",
                    error : err
                })
            }
    
            await usernameOrEmailAlreadyExists({email,username});
    
            const userDb = await createUser({name,username,email,password});
    
            return NextResponse.json({
                status : 201,
                message : "User registered successfully",
                data : userDb
            })
    
        } 
        
    catch (error) {
        return NextResponse.json({
            status : 500,
            message : "Internal server error",
            error : error
        })
    }
}

const createUser = ({name,username,email,password})=>{
    return new Promise(async (resolve,reject)=>{

        const hashPassword = await hash(password,parseInt(process.env.SALT));

        const userObj = new User({
            name : name,
            username : username,
            email : email,
            password : hashPassword
        })
        try{
            const userDb = await userObj.save();
            resolve(userDb);

        }catch(err){
            reject(err);
        }
    })
}

const usernameOrEmailAlreadyExists = ({email,username})=>{
    return new Promise(async (resolve,reject)=>{
        try{

            const userExists = await User.findOne({
                $or : [{email},{username}]
            })

            if(userExists && userExists.email === email) reject("Email already exists");
            if(userExists && userExists.username === username) reject("Username already exists");

            resolve();

        } catch(err){
            reject(err);
        }
    })
}

const validateUserRegisterationData = ({name,username,password,email})=>{
    return new Promise((resolve, reject)=>{
        if(!name){
            return reject('name is required');
        }
        if(!email){
            return reject('email is required');
        }
        if(!username){
            return reject('username is required');
        }
        if(!password){
            return reject('password is required');
        }

        if(typeof(name) !== 'string') reject('name should be text format');
        if(typeof(email) !== 'string') reject('email should be text format');
        if(typeof(username) !== 'string') reject('username should be text format');
        if(typeof(password) !== 'string') reject('password should be text format');

        if(username.length <= 2 || username.length > 20) reject('username must have length between 3 and 20 characters');

        if (password.length <= 2 || password.length > 20) reject("password length should be 3-20");

        // if(!validator.isAlphanumeric(password)) reject('password must contain a-z, A-Z, 0-9');
        if(!validator.isEmail(email)) reject('Not a email format');

        resolve();
    })
}