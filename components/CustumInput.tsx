import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
import {z} from "zod"
import { FormField,FormLabel ,FormControl,FormMessage } from './ui/form'

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Control, Controller, FieldPath, useForm } from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from 'react-hook-form'
import { authformSchema } from '@/lib/utils'
import { error } from 'console'
const formSchema=authformSchema('sign-up');
interface CustomInput{
    control: Control<z.infer<typeof formSchema>>,
    name:FieldPath<z.infer<typeof formSchema>>,
    label:string,
    placeholder:string
}

const CustumInput = ({control,name,label,placeholder}:CustomInput) => {
  return (
    <div>

         <FormField 
                     control={control}
                     name={name}
                     render={({field})=>(
                     <div className='form-item'>
                      <FormLabel className='form-label'>
                        {label}
                      </FormLabel>
                      <div className='flex w-full flex-col'>
                        <FormControl>
                          <Input
                            placeholder={placeholder}
                              type={name==='password'?'password' :'text'}
                              className=" input-class "
                              
                        //   placeholder='Enter Your Email' className='input-class'
                          {...field}
                          value={field.value as string || ""}/>
                        </FormControl>
                        <FormMessage className='form-message mt-2'/>
        
                      </div>
        
                     </div>
                     )}
                     
                    />
                    {/* <Controller
                      name={name}
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel >
                            {label}
                          </FieldLabel>
                          
                          
                            <Input
                              {...field}
                              
                              placeholder={placeholder}
                              type={name==='password'?'password' :'text'}
                              className=" input-class "
                              value={(field.value as string)||""}
                              
                            />
                           
                         
                         
                          {fieldState.invalid && (
                            <FieldError className='input-message' />
                          )}
                        </Field>
                      )}
                    /> */}
      
    </div>
  )
}

export default CustumInput
