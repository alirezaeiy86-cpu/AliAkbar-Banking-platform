'use client'
import Link from 'next/link'
import React from 'react'
import { Tabs,TabsContent,TabsList,TabsTrigger } from './ui/tabs'
import { BankTabItem } from './BankTabItem'
import BankInfo from './BankInfo'
import TransactionsTable from './TransactionsTable'
import { useRouter } from 'next/navigation'
import { Pagination } from './Pagination'

const RecentTransactions = ({
    accounts,
    transactions=[],
    appwriteItemId,
    page=1,


}:RecentTransactionsProps) => {
    const  rowsPage=10;
    const totalPages =Math.ceil(transactions.length/rowsPage);

    const indexOfLastTransactions =page * rowsPage;
    const idexOfFirstTransactions =indexOfLastTransactions - rowsPage;

    const currentTransactions =transactions.slice(
        idexOfFirstTransactions,indexOfLastTransactions
    )

    const router= useRouter();
    console.log("Acount rjkdvdjvvfhvcm vdjlvkxmnjdflkcxvkjdvxmndjklcxnm ,kxnm Data:", appwriteItemId);
  return (
   <section className='recent-transactions'>
    <header className='flex item-center justify-between '>
        <h2 className='recent-transactions-label'>
            Recent Transactions
        </h2>
        <Link href={`/transaction-history/?id=${appwriteItemId}`} 
        className="view-all-btn ">
            View all 

        </Link>
    </header>

    <Tabs key={appwriteItemId} defaultValue={appwriteItemId} className="w-full flex flex-col" 
  >
        <TabsList className='recent-transactions-tablist'>
            
         {accounts.map((account:Account)=>(
             <TabsTrigger
                  key={account.id} 
                  value={account.appwriteItemId}
                  >
                 <BankTabItem
                  key={account.id}
                  account={account}
                  appwriteItemId={appwriteItemId} 
                 
                    
                 />
                </TabsTrigger>
         ))}
          
        </TabsList>
        {accounts.map((account:Account)=>(
            <TabsContent
            value={account.appwriteItemId}
            key={account.id}
            className="space-y-4"
            >
                <BankInfo
                account={account}
                appwriteItemId={appwriteItemId}
                type='full'
                />

                <TransactionsTable transactions={currentTransactions} />
                
                {totalPages > 1 && (
                    <div className='my-4 w0full'>
                        <Pagination totalPages={totalPages}
                         page={page}/>
                    </div>
                )}
            </TabsContent>
        ))}

        
       
    </Tabs>

   </section>
  )
}

export default RecentTransactions;
