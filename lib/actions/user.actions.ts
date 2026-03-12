'use server';

const {
    APPWRITE_DATABSE_ID:DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID:USER_COLLECTIONS_ID,
    APPWRITE_BANK_COLLECTION_ID:BANK_COLLECTIONS_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID:TRANSACTION_COLLECTION_ID,
    
}= process.env;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion: '2026-02-25.clover'
});
export const getTransactionsByBankId= async({
    bankId,
}:{bankId:string})=>{
    try{
        const {Database}= await createAdminClient();
        const  result = await Database.listDocuments(
            DATABASE_ID!,
            TRANSACTION_COLLECTION_ID!,
            [Query.equal('bankId',bankId)]

        )
        return parseStringify(result.documents);


    }catch(error){
        console.log("Error fetching Transactions:" , error);
    }
}
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";

import { ID, Query, } from "node-appwrite";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";

import { plaidClient } from '@/lib/plaid';
 export const getUserInfo = async ({userId}:getUserInfoProps)=>{
      try{
        const {Database} = await createAdminClient();

        const user = await Database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTIONS_ID!,
            [Query.equal('userId',[userId])]
        )

        return parseStringify(user.documents[0]);

    }catch(error){
        console.log("Error",error)
    }

 }
export const signIn=async ({email,password}:signInProps)=>{
    try{
        //Mutation / Database / Make fetch
        const {account} = await createAdminClient();
         const session=await account.createEmailPasswordSession(email,password);
        const cookieStore=await cookies();
        cookieStore.set("appwrite-session",session.secret,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure:true,
        });

        const user = await getUserInfo({userId:session.userId})
        //  const cookieStore=await cookies();
        // cookieStore.set("appwrite-session",response.secret,{
        //     path:"/",
        //     httpOnly:true,
        //     sameSite:"strict",
        //     secure:true,
        // });

        return parseStringify(user);

    }catch(error){
        console.log('Error',error);
    }
    
}

export const signUp=async ({ password, ...userData}:SignUpParams)=>{
    const {email,firstName,lastName}=userData;

    let newUserAccount;
    try{
        //Mutation / Database / Make fetch
        const {account , Database} = await createAdminClient();
        newUserAccount= await account.create(
        ID.unique(),
        email,
        password,
        `${firstName} ${lastName}`
    );
    if(!newUserAccount) throw  new Error('Error Creating user')

       const stripeCustomerId = await createStripeCustomer(
        // ...userData,
        // type:'person'
            userData.firstName,
             userData.lastName,
             userData.email
       )

       if(!stripeCustomerId) throw new Error("Error creating Dwolla customer")

        // const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
        const newUser = await Database.createDocument(
            DATABASE_ID!,
            USER_COLLECTIONS_ID!,
            ID.unique(1),
            {
                ...userData,
                userId:newUserAccount.$id,
                stripeCustomerId:stripeCustomerId
            }
        )



        const session=await account.createEmailPasswordSession(email,password);
        const cookieStore=await cookies();
        cookieStore.set("appwrite-session",session.secret,{
            path:"/",
            httpOnly:true,
            sameSite:"strict",
            secure:true,
        });

        return parseStringify (newUser);


    }catch(error){
        console.log('Error',error);
    }
    
}
export async function getLooggedInUser() {

    try{
        const {account} = await createSessionClient();
        const result= await account.get();

        const user = await getUserInfo({userId:result.$id})
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
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { Processor } from "zod/v4/core";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { sources } from "next/dist/compiled/webpack/webpack";
import { createStripeCustomer } from "../stripe.actions";
import { error } from "console";
export const createLinkToken=async(user:User)=>{
    try{

        console.log("Debug",user);
        const tokenParams={
            
            user:{
                client_user_id:user.$id,
               
            },
             client_name:`${user.firstName} ${user.lastName}`,
            products:['auth','transactions'] as Products[],
            language:'en',
            country_codes:['US'] as CountryCode[],
           
        }
         const response = await plaidClient.linkTokenCreate(tokenParams);
         return parseStringify({linkToken:response.data.link_token});


    }catch(error){
        console.log("Error",error)
    }
}
export const createBankAccount =async ({
    userId,
    bankId,
    accountId,
    accessToken,
    stripeBankId,
    shareableId,

}:createBankAccountProps)=>{
    try{
       
        const { Database }  = await createAdminClient();
        const bankAccount =await Database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTIONS_ID!,
            ID.unique(),
            {
               userId,
              bankId,
              accountId,
               accessToken,
              stripeBankId,
              shareableId,

            }
        )

        return parseStringify(bankAccount);

    }catch(Error){
        console.log("dataBase Save Error:",error);

    }
}
export const exchangePublicToken = async ({
    publicToken,
    user,
}: exchangePublicTokenProps)=>{
    try{
       
       console.log("1. Starting is good");

        const response = await plaidClient.itemPublicTokenExchange({
            public_token:publicToken,
        });
        console.log("2 Plaif Token Exhage is good");

        const accessToken = response.data.access_token;
        const itemId =response.data.item_id;
        
        //Get account informations from Plaid using the access token 

        const accountResponse = await plaidClient.accountsGet({
            access_token:accessToken
        });
        const accountData = accountResponse.data.accounts[0];

        // Create a processor token for Dwolla using the acces token and account ID
        const stripeTokenResponse=await plaidClient.processorStripeBankAccountTokenCreate({
            access_token: accessToken,
            account_id:accountData.account_id,
        });

        console.log("3 Stipe Token is  good");
        

       const bankAccountToken = stripeTokenResponse.data.stripe_bank_account_token;
       console.log("Check Data",itemId,accessToken, bankAccountToken);
        console.log("Starting Appwrite Saving");

         const bankAccount =  await createBankAccount({
            userId:user.$id,
            bankId:itemId,
            accountId:accountData.account_id,
            accessToken:accessToken,
            stripeBankId:bankAccountToken,
            // fundingSourceUrl,
            // addFundingSource,
            shareableId:encryptId(accountData.account_id),
        })
        console.log("Apppwtite Saed")
       try{
        await stripe.customers.createSource(user.stripeCustomerId! ,{
        source:bankAccountToken,
        
        });
         console.log("4 Atthced is good");

       }catch(stripeError){
        console.error("stripe Error(skiping for now)");

       }
       

      

        //If the funding source URL not created throw an error
        if (stripeTokenResponse) throw Error;
         const bankData={
            userId:user.$id,
            bankId:itemId,
            accountId:accountData.account_id,
            accessToken:accessToken,
            shareableId:encryptId(accountData.account_id),
            stripeBankId:bankAccountToken,
        };
        console.log("Bank",bankData);


        //Create a bank acount using the user ID , item ID, account ID , access token, funding souce URL , and Sharable ID
       

        //revalidate the page to reflict the changes
        revalidatePath("/");

        return parseStringify({
            publicTokenExchange:"complete",
            bankAccount
            
        })

    }catch (error){
        console.log("Error",error);

    }
}
export const getBanks = async ({userId}:getBanksProps)=>{
    try{
        const {Database} = await createAdminClient();

        const Banks = await Database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTIONS_ID!,
            [Query.equal('userId',userId)]
        )

        return parseStringify(Banks.documents);

    }catch(error){
        console.log("Error in get banks ",error);
        return [];
    }
}

export const getBank = async ({documentId}:getBankProps)=>{
    try{
        const {Database} = await createAdminClient();
        if(!documentId) return null;

        const Bank = await Database.getDocument(
            DATABASE_ID!,
            BANK_COLLECTIONS_ID!,
            documentId
        )

        return parseStringify(Bank);

    }catch(error){
        console.log("Error in banks",error);
        return null;
    }
}


export const getBankByAccountId = async ({accountId}:getBankByAccountIdProps)=>{
    try{
        const {Database} = await createAdminClient();
        if(!accountId) return null;

        const Bank = await Database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTIONS_ID!,
            [Query.equal('accountId',[accountId])]
        )

        if(Bank.total !== 1) return null;

        return parseStringify(Bank.documents[0]);

    }catch(error){
        console.log("Error in banks",error);
        return null;
    }
}