import { Button, Modal } from "flowbite-react"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { BsCloudUpload } from "react-icons/bs";
import Swal from 'sweetalert2'
import { useState } from "react";
import { Bars } from "react-loader-spinner";

const AddSongModal = ({ open, setOpen, getMyTracks }) => {

  const { register, handleSubmit } = useForm();
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ file }) => {
    setLoading(true);
    const uploadFile = file[0];
    const fd = new FormData();
    fd.append("audio", uploadFile);

    fetch(import.meta.env.VITE_BACKEND + "tracks/upload", {
      method: "POST",
      body: fd,
      headers: {
        "Authorization": authState.token
      }
    }).then(response => response.json()).then(res => {

      const data = {
        id: uuidv4(),
        readable: true,
        title: uploadFile.name.split(".mp3")[0],
        title_short: uploadFile.name.split(".mp3")[0],
        duration: res.duration,
        track_position: -1,
        disk_number: -1,
        rank: 0,
        preview: res.url,
        artist_id: authState.user.id,
        album_id: "",
      }
      axios.post(import.meta.env.VITE_BACKEND + "tracks/", {
        data
      }, {
        headers: {
          "Authorization": authState.token
        }
      }).then(({ data }) => {
        setLoading(false);
        setOpen(false)
        Swal.fire({
          title: 'Uploaded!',
          text: "Your file has been uploaded!",
          icon: 'success',
          background: '#18181b',
        }
        )
        getMyTracks();
      })
    }).catch(err => {
      Swal.fire({
        title: 'Error!',
        text: "Something went wrong!",
        icon: 'error',
        background: '#18181b',
      }
      )
      setOpen(false);
      setLoading(false);
    })
  }

  return (
    <>
      <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible size={"md"}>
        <Modal.Body className='bg-zinc-900'>
          {
            loading ?
              <div className="flex justify-center items-center p-20">
                <Bars color='#ef5567' />
              </div>
              :
              <div className='flex justify-center flex-col items-center gap-5'>
                <span className='text-white md:text-2xl'>Upload Song</span>
                <div className=" flex flex-col gap-5">
                  <form onSubmit={handleSubmit} className='mb-5'>
                    <label className="text-base leading-relaxed text-gray-500 dark:text-gray-400" htmlFor="fileUpload">
                      <BsCloudUpload className="text-7xl m-auto my-2 cursor-pointer" />
                    </label>
                    <input type="file" accept="image/*, audio/*" placeholder='Playlist name' id="fileUpload" className='bg-zinc-600 rounded mb-5 w-full'
                      {...register("file")}
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
          }
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddSongModal