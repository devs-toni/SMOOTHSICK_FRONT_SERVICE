import { useState } from 'react';
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Button, TextInput } from 'flowbite-react';

export const ForgotPassword = () => {
    // const [isLoading, setIsLoading] = useState(false)
    // const { register, handleSubmit, reset } = useForm()

    // const onSubmit = async (data) => {
    //     setIsLoading(true)
    //     await axios.post(import.meta.env.VITE_DB_URI_FORGOT_PASSWORD, { data })
    //         .then(res => {
    //             setIsLoading(false)
    //             toast.success("Check your email", {
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#333",
    //                     color: "#fff",
    //                 },
    //                 error: {
    //                     duration: 10000,
    //                 },
    //             })
    //             reset()
    //         }).catch(err => {
    //             setIsLoading(false)
    //             toast.error("Wrong email, check it", {
    //                 style: {
    //                     borderRadius: "10px",
    //                     background: "#333",
    //                     color: "#fff",
    //                 },
    //                 error: {
    //                     duration: 10000,
    //                 },
    //             })
    //         })
    // }

    return 
    // (
    //     <form onSubmit={handleSubmit(onSubmit)}>
    //         <TextInput
    //             type='email'
    //             placeholder='Your email here!'
    //             required={true}
    //             {...register("text")}
    //         />
    //         {
    //             isLoading
    //                 ?
    //                 <Bars
    //                     height="80"
    //                     width="80"
    //                     color="#952003"
    //                     visible={true}
    //                 />
    //                 :
    //                 <Button type='submit'>Confirm change</Button>
    //         }
    //     </form>
    // )

}