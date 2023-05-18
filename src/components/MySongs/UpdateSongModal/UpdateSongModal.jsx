import { Button, Modal } from "flowbite-react"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../../context/AuthContext";

const UpdateSongModal = ({ open, id, setOpen, getMyTracks }) => {

  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState({});
  const { authState } = useAuth();

  useEffect(() => {

    const getTrackData = async () => {
      reset();
      axios.get(import.meta.env.VITE_BACKEND + "tracks/" + id)
        .then(({ data }) => {
          setTrack(data)
        })
    }
    open && getTrackData();
  }, [open, id])

  const onSubmit = async ({ trackTitle, albumTitle }) => {
    const newTrack = {
      ...track,
      title: trackTitle,
      title_short: trackTitle,
    }

    setLoading(true);
    axios.put(import.meta.env.VITE_BACKEND + "tracks/" + id, {
      newTrack
    }, {
      headers: {
        "Authorization": authState.token
      }
    })
      .then(res => {
        setLoading(false);
        getMyTracks();
        setOpen(false);
        Swal.fire({
          title: 'Updated!',
          text: "Your file has been updated!",
          icon: 'success',
          background: '#18181b',
          confirmButtonColor: '#ef5567',
        }
        )
        reset();
      }).catch(err => {
        Swal.fire({
          title: 'Error!',
          text: "Something went wrong!",
          icon: 'error',
          background: '#18181b',
          confirmButtonColor: '#ef5567',
        }
        )
        setOpen(false);
        setLoading(false);
      })
  }

  return (
    <>
      <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible>
        <Modal.Body className='bg-zinc-900'>
          {
            loading ?
              <div className="flex justify-center items-center p-20">
                <Bars color='#ef5567' />
              </div>
              :
              <div className='flex justify-center flex-col items-center gap-5'>
                <span className='text-white text-3xl'>Update Song</span>
                <div className=" flex flex-col gap-5">
                  <form onSubmit={handleSubmit} className='mb-5'>
                    <div className="w-full flex flex-col">
                      <label className="text-base leading-relaxed text-gray-500 dark:text-gray-400 m-auto" htmlFor="trackTitle">
                        Title
                      </label>
                      <input type="text" id="trackTitle" className='bg-zinc-600 rounded mb-5' defaultValue={track.title}
                        {...register("trackTitle")}
                      />
                    </div>
                    <Button
                      className='bg-deezer m-auto mt-4 text-xl'
                      onClick={handleSubmit(onSubmit)}
                    >
                      Update
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

export default UpdateSongModal