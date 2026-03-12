export const dynamic ='force-dynamic'
import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSideba";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.action";
import { getLooggedInUser } from "@/lib/actions/user.actions";
import { access } from "fs";
import React from "react";
import { string } from "zod";

const Home= async ( {searchParams}:SearchParamProps) => {
    const {id,page}= await searchParams;
    const currentpage =Number(page as string) || 1;

    const  loggeIn= await getLooggedInUser();
 
    const accounts =await getAccounts({userId:loggeIn.$id});
    

    if(!accounts) return;

    const accountsData=accounts?.data;

    const appwriteItemId=(id as string) || accountsData?.
    [0]?.appwriteItemId;

    console.log("Sended Id To funcations");
    const account = await getAccount({appwriteItemId});
   
    
    // console.log({
    //     accountsData,
    //     account
        
        
    // })
    // console.log("All Acounts from good",accountsData?.data);
    // console.log("THis Acounts From GOod:", account?.data);

    return(
        <section className="home">

            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggeIn?.firstName || 'Guest'}
                    subtext="Access and manage Your account and Transactions efficiently."/>

                    <TotalBalanceBox
                    accounts={accountsData}
                    totalBanks={accounts?.totalBanks}
                    totalCurrentBalance={accounts?.totalCurrentBalance}
                    />

                </header>

                <RecentTransactions 
                accounts={accountsData}
                transactions={account?.transactions}
                appwriteItemId={appwriteItemId}
                page={currentpage}/>
            </div>
            <RightSidebar  
            user={loggeIn}
            transactions={account?.transactions}
            banks={accountsData?.slice(0,2)}
            />
        </section>
    )
}
export default Home;