"use client"
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import  {useForm } from 'react-hook-form'
import { Form } from './ui/form'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Controller } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import { getLooggedInUser, signIn,signUp } from '@/lib/actions/user.actions'

import{ date, email, z } from "zod"
import { FieldControl } from '@base-ui/react'
import CustumInput from './CustumInput'
import { authformSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { useRouter } from 'next/navigation'





const AuthForm = ({ type } : { type : string }) => {
  
    const router=useRouter();
    const [user,setUser]=useState(null);
    const [isLoading,setIsLoading]=useState(false);
    const formSchema=authformSchema(type);
    
    

    const form =useForm<z.infer<typeof formSchema>>({
      resolver :zodResolver(formSchema as any),
      defaultValues:{
       email:"",
       password:"",
       firstName:"",
       lastName:"",
       address1:"",
       city:"",
       state:"",
       postalCode:"",
       dateOfBirth:"",
       ssn:"",
       
        
      },
        
        
    })
  

    const onSubmit= async (data: z.infer<typeof formSchema>) =>{


      setIsLoading(true);

      try{
        if(type === 'sign-up'){
          const newUser= await signUp(data)
            
          setUser(newUser);
          
        }
        if(type === 'sign-in'){
          const response = await signIn({
            email:data.email,
            password:data.password,
          })
          if(response){
            console.log("agfhghagf");
             router.push('/')
          }
        }
       

      
      

      }catch(error){
        console.log("error",error);

      }finally{
        setIsLoading(false);

      }
    }

    
    
      
      
    
  
  //  console.log("esg",form.formState.errors);
   return (
    <section className="auth-form">
        <header className="flex flex-col gap-5  md:gap-8" style={{ alignItems:"flex-start"}}>

            <Link href="/" className=" flex cursor-pointer  item-center gap-1 ">
                <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="Horizon Logo"
                                  
                />
                <h1 className="text-26 font-imb-plex-serif font-bold text-black-1">Horizon</h1>
            </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                 <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
                    {user
                    ? 'Link Account'
                    :type==='sign-in' ? 'Sign-in'
                    :'Sign-Up'
                } 
                <p className='text-16 font-normal text-gray-600'>
                    {user 
                    ? 'Link your account to started'
                :'Please enter your details'}
                </p>
                 </h1>
            </div>
        </header>
      {user ?  (
        <div className="flex flex-col gap-4">
            {/* PlaidLink*/}
        </div>

      ):(
        <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              {type==='sign-up' && (
            <>
            <div className='flex gap-4'>
            <CustumInput  control={form.control} name="firstName" label="Fist Name" placeholder="Enter your Your Fist Name"/>
            <CustumInput  control={form.control} name="lastName" label="Last Name" placeholder="Enter your Your last Name"/>
            </div>
            <CustumInput  control={form.control} name="address1" label="Address" placeholder="Enter your Your specific address"/>
            <CustumInput  control={form.control} name="city" label="City" placeholder="Enter your Your City"/>
            <div className='flex gap-4'>
            <CustumInput  control={form.control} name="state" label="State" placeholder="Example: NY"/>
            <CustumInput  control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 11101"/>
            </div>
             <div className='flex gap-4'>
            <CustumInput  control={form.control} name="dateOfBirth" label="Date of birth" placeholder="Example: YYYY-MM-DD"/>
            <CustumInput  control={form.control} name="ssn" label="SSN" placeholder="Example:1234"/>
             </div>
            </>
           )}

           <CustumInput  control={form.control} name="email" label="Email" placeholder="Enter your UserName"/>

            <CustumInput control={form.control} name="password" label="Passowrd" placeholder="Enter your password"/>

            
              
            
             <div className='flex flex-col gap-5 '>
             <Button type="submit" disabled={isLoading} className="form-btn mt-2">
            
             {isLoading ? (
              <>
              <Loader2 size={20}
              className='animate-spin'/> &nbsp;
               Loading...
              </>
             
             ) : type==='sign-in'
               ? 'Sign In' : 'Sign-up'
           }
           </Button>
          </div>
          
          </form>
        </Form >
        <footer className='flex justify-center gap-1'>
          <p className='text-14 font-normal text-gray-600'>
            {type ==='sign-in'
          ? "Don't have an account?"
           : "Already have an account?"}</p>
           <Link className='form-link' href={type==='sign-in' ? '/sign-up'
            : '/sign-in'
           }>
            {type==='sign-in' ? 'sign-up'
            : 'sign-in'
           }
           </Link>
    </footer> 
        {/* <Form {...form}>
        
        
        <form className=' w-[420] space-y-8 '  onSubmit={form.handleSubmit(onSubmit)} >
          {type==='sign-up' && (
            <>
            <div className='flex gap-4'>
            <CustumInput  control={form.control} name="firstName" label="Fist Name" placeholder="Enter your Your Fist Name"/>
            <CustumInput  control={form.control} name="lastName" label="Last Name" placeholder="Enter your Your last Name"/>
            </div>
            <CustumInput  control={form.control} name="address1" label="Address" placeholder="Enter your Your specific address"/>
            <div className='flex gap-4'>
            <CustumInput  control={form.control} name="state" label="State" placeholder="Example: NY"/>
            <CustumInput  control={form.control} name="postalCode" label="Postal Code" placeholder="Example: 11101"/>
            </div>
             <div className='flex gap-4'>
            <CustumInput  control={form.control} name="dateOfBirth" label="Date of birth" placeholder="Example: YYYY-MM-DD"/>
            <CustumInput  control={form.control} name="ssn" label="SSN" placeholder="Example:1234"/>
             </div>
            </>
          )}
          <FieldGroup className=''>
            
            <CustumInput  control={form.control} name="email" label="Email" placeholder="Enter your UserName"/>

            <CustumInput control={form.control} name="password" label="Passowrd" placeholder="Enter your password"/>

            
          </FieldGroup>
        </form>
      
      
        <form >
          
          <div className='flex flex-col gap-5 '>
            <Button type="submit" disabled={isLoading} className="form-btn mt-2">
            
            {isLoading ? (
              <>
              <Loader2 size={20}
              className='animate-spin'/> &nbsp;
               Loading...
              </>
             
            ) : type==='sign-in'
              ? 'Sign In' : 'Sign-up'
          }
          </Button>
          </div>
        </form>
      
    </Form>

    <footer className='flex justify-center gap-1'>
          <p className='text-14 font-normal text-gray-600'>
            {type ==='sign-in'
          ? "Don't have an account?"
           : "Already have an account?"}</p>
           <Link className='form-link' href={type==='sign-in' ? '/sign-up'
            : '/sign-in'
           }>
            {type==='sign-in' ? 'sign-up'
            : 'sign-in'
           }
           </Link>
    </footer> */}
        </>
      )}
    </section>
  
)}

export default AuthForm
