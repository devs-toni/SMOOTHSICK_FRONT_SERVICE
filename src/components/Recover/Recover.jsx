import axios from "axios";
import { LOGIN } from "../../router/paths";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLanguage } from "../../context/LanguageContext";
import { Button, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";

export const Recover = () => {
  const { register, handleSubmit, reset } = useForm()
  const { text } = useLanguage();
  const { userId } = useParams()
  const navigate = useNavigate()

  const onSubmit = async ({ pass, repeatPass }) => {
    if (pass !== repeatPass) {
      toast.error("Passwords do not match", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        error: {
          duration: 2000,
        },
      });
    }

    try {
      await axios.patch(import.meta.env.VITE_DB_URI_FORGOT_RESET_PASS, { pass, userId })
        .then(({ data, status }) => {
          console.log(status);
          if (status === 201) {
            // toast.error("The password must have: between 8 and 16 characters, 1 number, 1 lowercase letter, 1 uppercase letter, and a special character", {
            //   style: {
            //     borderRadius: "10px",
            //     background: "#333",
            //     color: "#fff",
            //   },
            //   error: {
            //     duration: 2000,
            //   },
            // });
            toast.success("Password updated successfully", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              error: {
                duration: 10000,
              },
            });
            reset()
            navigate(LOGIN)




          }
        })
    } catch (error) {
      console.error(error);
    }
  }

  const styleInput = {
    backgroundColor: "#00000000"
  };


  return (
    <div className="h-full flex justify-center items-center md:ml-20 lg:ml-52">
      <div className="headphones-image"></div>
      <div className="flex flex-col items-center justify-center h-full pt-20 w-full">
        <p className="text-lg md:text-4xl font-semibold mb-12">{text.recover.title}</p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex item-center flex-col gap-4 max-w-xl w-full px-10 pt-10 m-4 rounded-md register image-z"
        >
          <div>
            <TextInput
              type="password"
              id="newPass1"
              placeholder={text.recover.new1}
              className=" border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
              {...register("pass")}
              color="white"
              required={true}
              style={styleInput}
            />
          </div>
          <div>
            <TextInput
              type="password"
              id="newPass2"
              placeholder={text.recover.new2}
              color="white"
              className="text-white border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
              {...register("repeatPass")}
              required={true}
              style={styleInput}
            />
          </div>

          <Button
            className="text-xs md:text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500 ease-in-out transform text-white font-bold"
            type="submit"
          >
            {text.recover.submit}
          </Button>

        </form>
        <div className="flex item-center w-3/12 ">
        </div>
      </div>
    </div>
  )
}
