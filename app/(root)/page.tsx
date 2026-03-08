import HeaderBox from "@/components/HeaderBox";
import RightSidebar from "@/components/RightSideba";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { access } from "fs";
import React from "react";

const Home= () => {

    const  loggeIn={firstName:'Ali Akbar', lastName:'ALS',email:'alirezaeiy76@gmail.com'};
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