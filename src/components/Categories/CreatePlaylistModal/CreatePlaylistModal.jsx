
import { Button, Modal } from 'flowbite-react'
import { useForm } from "react-hook-form";

const CreatePlaylistModal = ({ setOpen, open, setNewList }) => {
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = (data) => {
        setNewList(data)
        setOpen(false)
        reset()
    }


    return (
        <>
            <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible>
                <Modal.Body className='bg-zinc-900'>
                    <div className='flex justify-center flex-col items-center gap-5'>
                        <span className='text-white'>Create playlist</span>
                        <div className=" flex flex-col gap-5">
                            <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Name
                            </span>
                            <form onSubmit={handleSubmit(onSubmit)} className='mb-5'>
                                <input type="text" placeholder='Playlist name' className='bg-zinc-600 rounded mb-5'
                                    {...register("text")}
                                />
                                <Button
                                    className='bg-deezer'
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