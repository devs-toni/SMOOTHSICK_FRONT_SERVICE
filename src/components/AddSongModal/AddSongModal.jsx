import { Button, Modal } from "flowbite-react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const AddSongModal = ({ open, setOpen }) => {

  const { register, handleSubmit, reset } = useForm();
  const { authState } = useAuth();

  const onSubmit = async ({ file }) => {
    const data = {
      id: uuidv4(),
      title: file[0].name.split(".mp3")[0],
      title_short: file[0].name.split(".mp3")[0],
      duration: 0,
      track_position: -1,
      disk_number: -1,
      rank: 0,
      preview: "",
      artist_id: authState.user.id,
      album_id: "",
    }
    let form = new FormData();
    form.append("file", file[0]);
    const headers = {
      "Content-Type": "multipart/form-data"
    }

    fetch(import.meta.env.VITE_BACKEND + "tracks/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: { form }
    }
      , headers)
      .then(res => {
        console.log(res);
      })

  }

  return (
    <>
      <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible>
        <Modal.Body className='bg-zinc-900'>
          <div className='flex justify-center flex-col items-center gap-5'>
            <span className='text-white'>Upload Song</span>
            <div className=" flex flex-col gap-5">
              <form onSubmit={handleSubmit} className='mb-5'>
                <span className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  File
                </span>
                <input type="file" placeholder='Playlist name' className='bg-zinc-600 rounded mb-5'
                  {...register("file")}
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

export default AddSongModal