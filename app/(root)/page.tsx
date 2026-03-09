import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSideba";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getLooggedInUser } from "@/lib/actions/user.actions";
import { access } from "fs";
import React from "react";

const Home= async () => {

    const  loggeIn= await getLooggedInUser();
    return(
        <section className="home">

            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                    type="greeting"
                    title="Welcome"
                    user={loggeIn?.name || 'Guest'}
                    subtext="Access and manage Your account and Transactions efficiently."/>

                    <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250.35}
                    />

                </header>

                RECENT TRANSACTIONS
            </div>
            <RightSidebar  
            user={loggeIn}
            transactions={[]}
            banks={[{currentBalance:123.50},{currentBalance:500.50}]}
            />
        </section>
    )
}
export default Home;