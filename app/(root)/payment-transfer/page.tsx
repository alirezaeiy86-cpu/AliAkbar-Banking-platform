export const dynamic ='force-dynamic';

import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymenTransferForm";
import React from "react";
import { getAccounts } from "@/lib/actions/bank.action";
import { getLooggedInUser } from "@/lib/actions/user.actions";
// import PaymentTransferFormWrapper from "@/components/PaymentTransferFormWrapper";


const Transfer= async ()=>{
    const  loggeIn= await getLooggedInUser();
     
        const accounts =await getAccounts({userId:loggeIn.$id});
        const accountsData=accounts?.data;
      
    return(
        <section className="payment-transfer">
            <HeaderBox
            title="Payment Transfer"
            subtext="Please provide any specific details or  notes related to payments transfer"/>
           <section className="size-full pt-5 ">
          
            <PaymentTransferForm accounts={accountsData}/>  
            </section> 
        </section>
    )
}

export default Transfer