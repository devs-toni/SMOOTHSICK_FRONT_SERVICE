import { Modal, Button } from "flowbite-react"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from "../../../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"

export const ChangePasswordModal = ({ setOpen, open }) => {
    
    const { register, handleSubmit, reset } = useForm()
    const [hiddenCurrentPassword, setHiddenCurrentPassword] = useState("")
    const [hiddenNewPassword, setHiddenNewPassword] = useState("hidden")
    const [modaltitle, setModalTitle] = useState("Confirm your current password")
    const { authState } = useAuth()
    const { user } = authState
    const { id } = user


    const onSubmitCurrentPass = (data) => {
        const { currentPass } = data

        try {
          axios.post(import.meta.env.VITE_BACKEND + "users/validatePassword", { currentPass, id })
                .then(({ status }) => {
                    if (status === 201) {
                        setHiddenCurrentPassword("hidden")
                        setHiddenNewPassword("")
                        setModalTitle("Create a new password")
                        reset()
                    }

                })
        } catch (error) {
            console.error(error);
        }
        
    }

    const onSubmitNewPass = (data) => {
        const { pass, repeatPass } = data
        if (pass !== repeatPass) {
            toast.error("Passwords do not match", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
                error: {
                    duration: 5000,
                },
            });
        }
        try {
          axios.patch(import.meta.env.VITE_BACKEND + "users/changePassword", { pass, id })
                .then(({ status }) => {
                    if (status === 201) {
                        toast.success("Password changed successfully", {
                            style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                            },
                            error: {
                                duration: 5000,
                            },
                        });
                        setHiddenCurrentPassword("")
                        setHiddenNewPassword("hidden")
                        setModalTitle("Confirm your current password")
                        setOpen(false)

                    }
                })
        } catch (error) {
            console.error(error);
        }

    }


    

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible>
                <Modal.Body className='bg-zinc-900'>
                    <div className='flex justify-center flex-col items-center gap-5'>
                        <span className='text-white'>Change password</span>
                        <div className=" flex flex-col gap-5 items-center">
                            <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {modaltitle}
                            </span>
                            <form onSubmit={handleSubmit(onSubmitCurrentPass)} className={`mb-5  ${hiddenCurrentPassword}`}>
                                <div className="flex gap-5">
                                    <input type="password" placeholder='Confirm your password' className="bg-zinc-600 rounded mb-5}"
                                        {...register("currentPass")}
                                    />
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <Button
                                        className='bg-deezer'
                                        onClick={handleSubmit(onSubmitCurrentPass)}
                                    >
                                        Confirma
                                    </Button>
                                </div>
                            </form>
                            <form onSubmit={handleSubmit(onSubmitNewPass)} className={`mb-5  ${hiddenNewPassword}`}>
                                <div className="flex gap-5">
                                    <input type="password" placeholder='New password' className="bg-zinc-600 rounded mb-5}"
                                        {...register("pass")}
                                    />
                                    <input type="password" placeholder='Confirm new password' className="bg-zinc-600 rounded mb-5}"
                                        {...register("repeatPass")}
                                    />
                                </div>
                                <div className="mt-5 flex justify-center">
                                    <Button
                                        className='bg-deezer'
                                        onClick={handleSubmit(onSubmitNewPass)}
                                    >
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

