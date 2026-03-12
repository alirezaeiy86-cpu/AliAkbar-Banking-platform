
import HeaderBox from "@/components/HeaderBox";
import React from "react";
 
import { getLooggedInUser } from "@/lib/actions/user.actions";
import { getAccounts } from "@/lib/actions/bank.action";
import BankCard from "@/components/BankCard";
const MyBanks= async()=>{
    const  loggeIn= await getLooggedInUser();
     
    const accounts =await getAccounts({userId:loggeIn.$id});
    return(
        <section>
            <div className="my-banks">
                <HeaderBox title="My Bank Accounts"
                subtext="Effortlessly manage your bankiing activites"/>
                <div className="space-y-4">
                    <h4 className="header-2">
                        Your Card
                    </h4>
                    <div className="flex flex-wrap gap-6">
                    {accounts && accounts.data.map((a:Account)=>(
                        <BankCard
                        key={a.id}
                        account={a}
                        userName={loggeIn?.firstName}/>
                    ))}

                    </div>

                </div>

            </div>
        </section>
    )
}

export default MyBanks