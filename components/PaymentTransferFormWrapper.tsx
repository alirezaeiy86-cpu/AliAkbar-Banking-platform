"use client"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentTransferForm from "./PaymenTransferForm";
const stripePromise =loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const PaymentTransferFormWrapper=({accounts}:{accounts:any []})=>{
    return(
        <Elements stripe={stripePromise}>
            <PaymentTransferForm accounts={accounts}/>     
        </Elements>
    )
}

export default PaymentTransferFormWrapper;

