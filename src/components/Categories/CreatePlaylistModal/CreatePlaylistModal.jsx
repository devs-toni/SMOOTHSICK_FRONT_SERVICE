
import axios from 'axios';
import { Button, Modal, TextInput } from 'flowbite-react'
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext"
import { toast } from 'react-hot-toast';
import { useUser } from '../../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { MdPlaylistAdd } from 'react-icons/md';
import { useLanguage } from '../../../context/LanguageContext';


const CreatePlaylistModal = ({ open, setOpen }) => {
    const { getMyPlaylists } = useUser()
    const { register, handleSubmit, reset } = useForm()
    const { authState } = useAuth();
    const { user } = authState
    const { id } = user
    const { text } = useLanguage();


    const onSubmit = (data) => {
        const { title } = data
        axios.post(import.meta.env.VITE_BACKEND + 'playlists/newPlaylist', { title, playlist_id: uuidv4(), user_id: id })
            .then(({ status }) => {
                if (status === 201) {
                    toast.success(text.toast.toast3, {
                        style: {
                            borderRadius: "10px",
                            background: "#333",
                            color: "#fff",
                        },
                        error: {
                            duration: 5000,
                        },
                    });
                    getMyPlaylists()
                    setOpen(false)
                    reset()
                } else {

                }
            })

    }



    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)} size={"xl"} dismissible>
                <Modal.Body className='bg-zinc-900 rounded'>
                    <div className='flex justify-center flex-col items-center'>
                        <span className='text-white md:text-2xl'>Create playlist</span>
                        <div className=" flex flex-col gap-5">
                            <form onSubmit={handleSubmit(onSubmit)} className=' m-auto flex flex-col items-center'>
                                <label className="text-gray-500 dark:text-gray-400" htmlFor="fileUpload">
                                    <MdPlaylistAdd className="m-auto my-2 cursor-pointer" size={70} />
                                </label>
                                    <input type="text" placeholder={text.playlists.holder_name} className='bg-zinc-600 rounded mb-5 md:w-80 '
                                        {...register("title")}
                                    />
                                    <textarea type="text" placeholder={text.playlists.holder_des} className='bg-zinc-600 rounded mb-5 w-60 md:w-80 resize-none'
                                        {...register("description")}
                                    />
                                <Button
                                    className='bg-deezer my-5'
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    {text.register.btn_create}

                                </Button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreatePlaylistModal