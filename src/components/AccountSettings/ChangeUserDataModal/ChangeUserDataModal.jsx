import { Button, Modal } from "flowbite-react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useLanguage } from "../../../context/LanguageContext"


export const ChangeUserNameModal = ({ setOpen, open }) => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { authState } = useAuth()
  const { user } = authState
  const { id } = user
  const { text } = useLanguage()

  const onSubmitUserName = (data) => {
    const { userName } = data
    try {
      axios.patch(import.meta.env.VITE_BACKEND + "users/changeUserName", { userName, id })
        .then(({ status }) => {
          if (status === 201) {
            toast.success(text.username.new_username_added, {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              error: {
                duration: 5000,
              },
            });
            user.userName = userName
            reset()
            setOpen(false)
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
            <span className='text-white'>{text.username.c_user}</span>
            <div className={`flex flex-col gap-5 items-center`}>
              <form onSubmit={handleSubmit(onSubmitUserName)} className={'mb-5'}>
                <input type="text" placeholder={text.username.placeholder} className={'bg-zinc-600 rounded mb-5'}
                  {...register("userName", {
                    required: true,
                    maxLength: 10,
                    pattern: /^[a-zA-Z]+$/
                  })}
                />
                {errors?.userName?.type === "required" && <p className="text-red-500">{text.username.required_name}</p>}
                {errors?.userName?.type === "pattern" && <p className="text-red-500">{text.username.required_ok}</p>}
                <div className="mt-5 flex justify-center">
                  <Button
                    className='bg-deezer'
                    onClick={handleSubmit(onSubmitUserName)}
                  >
                    {text.recover.btn_update}
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

