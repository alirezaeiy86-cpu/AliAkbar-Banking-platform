export const dynamic ='force-dynamic';

import AuthForm from '@/components/AuthForm'
import  React from  'react'
import { getLooggedInUser } from '@/lib/actions/user.actions';

const SignUp= async()=>{
    //const loggedInUser =await getLooggedInUser();
    // console.log(loggedInUser);
    return(
        <section className='flex-center size-full max-sm:px-6'>
            <AuthForm type="sign-up"/>
        </section>
    )
}
export default SignUp