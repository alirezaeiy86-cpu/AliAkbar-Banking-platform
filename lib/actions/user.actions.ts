'use server';
import { email } from "zod";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import path from "path";
import { ID, } from "node-appwrite";
import { parseStringify } from "../utils";
import { SigningOptions } from "crypto";
import { count } from "console";
export const signIn=async ({email,password}:signInProps)=>{
    try{
        //Mutation / Database / Make fetch
        const {account} = await createAdminClient();
        const response = await account.createEmailPasswordSession(email,password);
         const cookieStore=await cookies();
        cookieStore.set("appwrite-session",response.secret,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure:true,
        });

        return parseStringify(response);

    }catch(error){
        console.log('Error',error);
    }
    
}

export const signUp=async (userData:SignUpParams)=>{
    const {email,password,firstName,lastName}=userData;
    try{
        //Mutation / Database / Make fetch
        const {account} = await createAdminClient();
       const newUserAcount= await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
    );
        const session=await account.createEmailPasswordSession(email,password);
        const cookieStore=await cookies();
        cookieStore.set("appwrite-session",session.secret,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure:true,
        });

        return parseStringify (newUserAcount);


    }catch(error){
        console.log('Error',error);
    }
    
}
export async function getLooggedInUser() {

    try{
        const {account} = await createSessionClient();
        const user= await account.get();
        return parseStringify(user);

    }catch(error){
        return null;
    }
    
}
export const  logoutAccount= async ()=>{
    try{
        const {account} = await  createSessionClient();
        (await cookies()).delete('appwrit-session');
        await account.deleteSession('current');

        return true

    }catch(error){

    }
}