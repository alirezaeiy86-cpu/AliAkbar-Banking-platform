"use server"
import { createAdminClient } from "../appwrite"
import { ID } from "node-appwrite";
import { parseStringify } from "../utils";

const {
    APPWRITE_DATABSE_ID:DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID:USER_COLLECTIONS_ID,
    APPWRITE_BANK_COLLECTION_ID:BANK_COLLECTIONS_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID:TRANSACTION_COLLECTION_ID,
    
}= process.env;
export  const createTransaction =  async(transaction:CreateTransactionProps)=>{
    try{
        const {Database}=await createAdminClient();

        const newTransaction= await Database.createDocument(
            DATABASE_ID!,
            TRANSACTION_COLLECTION_ID!,
            ID.unique(),
            {
                channel:'online',
                category:'Transfer',
               
                ...transaction,
                 senderId:transaction.senderId,
            }
        )


        return parseStringify(newTransaction);

    }catch(error){
        console.log(error)
    }
}