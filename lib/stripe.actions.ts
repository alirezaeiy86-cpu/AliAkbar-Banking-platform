"use server"
import { error } from 'console';
import { access } from 'fs';
import Stripe from 'stripe';
import { string } from 'zod';
import { plaidClient } from './plaid';
import { parseStringify } from './utils';



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!,{
    apiVersion:'2026-02-25.clover',
});
export const createStripeBankAccount= async (customerId:string , bankToken:string)=>{
    try{
        const bankAccount = await stripe.customers.createSource(customerId,{
            source:bankToken,
        });
        return bankAccount.id;

    }catch(error){
        console.error("Stipe bank Connections failed:",error);

    }
}

export const getTransactions =async({accessToken}:{accessToken:string})=>{
    try{
        const response = await plaidClient.transactionsGet({
            access_token:accessToken,
            start_date:'2024-01-01',
            end_date:'2030-01-01',
        });

        return parseStringify(response.data.transactions);


    }catch(error){
        console.error("Fiald To get transactions");
    }
}

export const createStripeCustomer=async(firstName:string,lastName:string,email:string)=>{
    try{
        const customer = await stripe.customers.create({
            name:`${firstName} ${lastName}`,
            email: email,
        });
        return customer.id;


    }catch(Error){
        console.error("stripe Customer Creation faild",error);
    }
}

export const createTransfer = async ({
    sourceAccountId,
    destinationsAccountId,
    amount,
}:TransferParams)=>{
    try{

        const transfer = await stripe.paymentIntents.create({
            amount:Math.round(Number(amount) * 100),
            currency:'usd',
            payment_method_types:['card'],
            metadata:{
                sourceAccountId,
                destinationsAccountId,

            },

        });

        return parseStringify(transfer);


    }catch(error){
        console.log("Error in Stripe Transfer",error);
    }

}