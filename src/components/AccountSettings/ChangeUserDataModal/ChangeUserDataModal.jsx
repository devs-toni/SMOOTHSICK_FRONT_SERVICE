import { Button, Modal } from "flowbite-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useAuth} from "../../../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"


export const ChangeUserNameModal = ({ setOpen, open, modalData }) => {
  const { register, handleSubmit, reset } = useForm();
  const [modalTitle, setModalTitle] = useState("");
  const [inputData, setinputData] = useState("");
  const [inputType, setinputType] = useState("");
  const { authState } = useAuth()
  const { user } = authState
  const { id } = user


  useEffect(() => {
    if (modalData === "userName") {
      setinputData("Enter a new user name")
      setModalTitle("Change user name")
      setinputType("text")
      reset()
    } else {
      setinputData("Enter a new email")
      setModalTitle("Change email")
      setinputType("email")
      reset()
    }
  }, [modalData])


  const onSubmit = (data) => {
    if (modalData === "userName") {
      const { type } = data
      try {
        axios.patch(import.meta.env.VITE_DB_URI_CHANGE_USERNAME, { type, id })
          .then(({ status }) => {
            if (status === 201) {
              toast.success("New user name saved!", {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
                error: {
                  duration: 5000,
                },
              });
              reset()
              setOpen(false)
            }
          })
      } catch (error) {
        console.error(error);
      }
    } else {
      const { type } = data
      try {
        axios.patch(import.meta.env.VITE_DB_URI_CHANGE_EMAIL, { type, id })
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
              reset()
              setOpen(false)
            }
          })
      } catch (error) {
        console.error(error);
      }
    }
  }


  return (
    <>
      <Modal show={open} onClose={() => setOpen(false)} className='rounded-xl' dismissible>
        <Modal.Body className='bg-zinc-900'>
          <div className='flex justify-center flex-col items-center gap-5'>
            <span className='text-white'>{modalTitle}</span>
            <div className=" flex flex-col gap-5 items-center">
              <form onSubmit={handleSubmit(onSubmit)} className="mb-5">
                <input type={inputType} placeholder={inputData} className="bg-zinc-600 rounded mb-5"
                  {...register("type")}
                />
              </form>
              <div className="mt-5 flex justify-center">
                <Button
                  className='bg-deezer'
                  onClick={handleSubmit(onSubmit)}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>

        </Modal.Body>
      </Modal>
    </>
  )
}

