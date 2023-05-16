
import axios from 'axios';
import { Button, Modal } from 'flowbite-react'
import { useForm } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext"
import { toast } from 'react-hot-toast';
import { useUser } from '../../../context/UserContext';
import { v4 as uuidv4 } from 'uuid';
import { MdPlaylistAdd } from 'react-icons/md';

const CreatePlaylistModal = ({ open, setOpen }) => {
    const { getMyPlaylists } = useUser()
    const { register, handleSubmit, reset } = useForm()
    const { authState } = useAuth();
    const { user } = authState
    const { id } = user


    const onSubmit = (data) => {
        const { title } = data
        axios.post(import.meta.env.VITE_BACKEND + 'playlists/newPlaylist', { title, playlist_id: uuidv4(), user_id: id })
            .then(({ status }) => {
                if (status === 201) {
                    toast.success("Playlist created susscesfully", {
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
            <Modal show={open} onClose={() => setOpen(false)} dismissible>
                <Modal.Body className='bg-zinc-900 rounded'>
                    <div className='flex justify-center flex-col items-center gap-5'>
                        <span className='text-white md:text-2xl'>Create playlist</span>
                        <div className=" flex flex-col gap-5">
                            <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                                <label className="text-base leading-relaxed text-gray-500 dark:text-gray-400" htmlFor="fileUpload">
                                    <MdPlaylistAdd className="text-7xl m-auto my-2 cursor-pointer" />
                                </label>
                                <input type="text" placeholder='Playlist name' className='bg-zinc-600 rounded mb-5'
                                    {...register("title")}
                                />
                                <Button
                                    className='bg-deezer m-auto'
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Create
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