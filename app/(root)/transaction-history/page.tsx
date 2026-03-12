export const dynamic = 'force-dynamic';
import HeaderBox from "@/components/HeaderBox";
import React from "react";
import { getLooggedInUser } from "@/lib/actions/user.actions";
import { getAccount } from "@/lib/actions/bank.action";
import { getAccounts } from "@/lib/actions/bank.action";
import { formatAmount } from "@/lib/utils";
import TransactionsTable from "@/components/TransactionsTable";
import { Pagination } from "@/components/Pagination";

const TransactionsHistory= async (props:SearchParamProps)=>{
    const searchParams = await props.searchParams;
    const id =searchParams.id as string;
    const page =searchParams.page as any;
    
  
      const currentpage =Number(searchParams.page as string) || 1;
    
        const  loggeIn= await getLooggedInUser();
     
        const accounts =await getAccounts({userId:loggeIn.$id});
        
    
        if(!accounts) return;
    
        const accountsData=accounts?.data;
    
        const appwriteItemId=(id as string) || accountsData?.
        [0]?.appwriteItemId;
    
        console.log("Sended Id To funcations");
        const account = await getAccount({appwriteItemId});
        
        console.log("this is am account so be carfull ok",account.transaction)

    
    //  const  rowsPage=10;
    // const totalPages =Math.ceil(account?.transaction.length/rowsPage);

    // const indexOfLastTransactions =page * rowsPage;
    // const idexOfFirstTransactions =indexOfLastTransactions - rowsPage;

    // const currentTransactions =account?.transaction.slice(
    //     idexOfFirstTransactions,indexOfLastTransactions
    // )
    return(
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox 
                title="Transactions History"
                subtext="See your bank Details and transactions"/>
            </div>
            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{account?.data.name}</h2>
                        <p className="text-14 text-blue-25">{account?.data.officialName}</p>
                          <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            **** **** **** {account?.data.mask}
                        </p>
                    </div>
                    <div className="transactions-account-balance">
                        <p className="text-14">Current Balance </p>
                        <p className="text-24 text-center font-bold">
                            {formatAmount(account?.data.currentBalance)}
                        </p>

                    </div>
                </div>
                <section className="flex w-full flex-col gap-6">
                    <TransactionsTable
                    transactions={account.transactions}
                    
                    page={currentpage}
                    />
                     {/* {totalPages > 1 && (
                        <div className='my-4 w0full'>
                        <Pagination totalPages={totalPages}
                        page={page}/>
                        </div>
                    )} */}

                </section>
            </div>

        </div>
    )
}

export default TransactionsHistory