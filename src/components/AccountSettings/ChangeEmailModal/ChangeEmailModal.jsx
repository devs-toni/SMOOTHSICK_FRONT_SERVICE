import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import { Button, Modal } from "flowbite-react";
import axios from "axios";



export const ChangeEmailModal = ({ setOpen, open }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { authState } = useAuth()
    const { user } = authState
    const { id } = user



    const onSubmitEmail = (data) => {
        const { userEmail } = data
        console.log(userEmail);
        try {
            axios.patch(import.meta.env.VITE_DB_URI_CHANGE_EMAIL, { userEmail, id })
                .then(({ status }) => {
                    if (status === 201) {
                        toast.success("New user email saved!", {
                            style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                            },
                            error: {
                                duration: 5000,
                            },
                        });
                        user.email = userEmail
                        reset()
                        setOpen(false)
                    } else {
                        toast.error("User email already exists!", {
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
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)} dismissible>
                <Modal.Body className='bg-zinc-900'>
                    <div className='flex justify-center flex-col items-center gap-5'>
                        <span className='text-white'>Change email</span>
                        <div className={`flex flex-col gap-5 items-center`}>
                            <form onSubmit={handleSubmit(onSubmitEmail)} className='mb-5'>
                                <input type="email" placeholder="Enter a new email" className={'bg-zinc-600 rounded mb-5'}
                                    {...register("userEmail", {
                                        pattern: /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/i
                                    })}
                                />
                                {errors?.userEmail?.type === "pattern" && <p className="text-red-500">Please write correct email address</p>}
                                <div className="mt-5 flex justify-center">
                                    <Button
                                        className='bg-deezer'
                                        onClick={handleSubmit(onSubmitEmail)}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>

                        </div>
                    </div>
                </Modal.Body>
            </Modal >
        </>
    )
}
