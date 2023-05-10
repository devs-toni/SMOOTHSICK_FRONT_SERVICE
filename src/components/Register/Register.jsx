import { Button, Label, TextInput } from "flowbite-react";
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../../router/paths";
import { useEffect, useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';
import { useLanguage } from '../../context/LanguageContext';
import RecoverModal from "../RecoverModal/RecoverModal";
import Error from "../partials/Error/Error";
import axios from "axios";
import { toast } from "react-hot-toast";



const Register = () => {


  const button_register = document.getElementById('send_data')
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [eyeClicked, setEyeClicked] = useState(false);
  const [buttonBehavior, setButtonBehavior] = useState("")


  useEffect(() => {
    authState.isAuthenticated &&
      navigate('/');
  }, [])

  const { text } = useLanguage();
  const { form, handleChange, handleBlur, validate, errors } = useForm({
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
  });

  useEffect(() => {
    if (eyeClicked) {
      setTimeout(() => {
        setEyeClicked(false)
      }, 3000);
    }
    if (errors.name || errors.lastname || errors.email || errors.username || errors.password || errors.repeatPassword) {
      setButtonBehavior("opacity-30")
      button_register.disabled = true;
    } else {
      if (button_register) {
        setButtonBehavior("")
        button_register.disabled = false;
      }
    }

  }, [eyeClicked, errors])


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND + "users/register", { form })
        .then(({ status }) => {
          if (status === 200) {
            navigate(LOGIN);
          } else if (status == 204) {
            toast.error("User already exist!", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
              },
              error: {
                duration: 2000,
              },
            });
          } else {
            toast.error("Something went wrong!", {
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
        });
    } catch (error) {
      console.log(error)
    }

  }

  const styleInput = (err) => {
    return {
      backgroundColor: !err ? "#00000000" : "#fff",
      border: err ? "1px solid red" : "1px solid #d0d0d000",
      color: err ? 'red' : 'white'
    }
  };

  return (
    <div className="h-full flex justify-center items-center mb-44 md:ml-20 lg:ml-52">
      {
        !authState.isAuthenticated &&
        (
          <>
            <div className="headphones-image"></div>
            <div className="flex flex-col items-center justify-center h-full pt-20 w-full">
              <p className="text-lg md:text-4xl font-semibold pt-20 mb-10">{text.register.title}</p>
              <form className="flex item-center flex-col gap-4 max-w-xl w-full px-10 pb-8 -pt-2 m-auto rounded-md register image-z" onSubmit={handleSubmit}>
                <div>
                  <TextInput
                    id="registerName"
                    type="text"
                    required={true}
                    shadow={true}
                    color="#fff"
                    style={styleInput(errors?.name)}
                    className={`border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500  ${errors.name && 'text-red-400 '}`}
                    name="name"
                    placeholder={text.register.name}
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Error text={errors?.name} />
                </div>
                <div>
                  <TextInput
                    id="registerLastname"
                    type="text"
                    required={false}
                    shadow={true}
                    color="white"
                    style={styleInput(errors?.lastname)}
                    className="border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
                    name="lastname"
                    value={form.lastname}
                    onChange={handleChange}
                    placeholder={text.register.lastname}
                  />
                </div>
                <div>
                  <TextInput
                    id="registerEmail"
                    type="text"
                    required={true}
                    shadow={true}
                    color="white"
                    style={styleInput(errors?.email)}
                    className="border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={text.register.email}
                  />
                  <Error text={errors?.email} />
                </div>
                <div>
                  <TextInput
                    id="registerUsername"
                    type="text"
                    required={true}
                    shadow={true}
                    color="white"
                    style={styleInput(errors?.username)}
                    className="border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={text.register.username}
                  />
                  <Error text={errors?.username} />
                </div>
                <div className="relative">
                  <TextInput
                    id="registerPassword"
                    type={eyeClicked ? "text" : "password"}
                    required={true}
                    shadow={true}
                    color="white"
                    style={styleInput(errors?.password)}
                    className="border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={text.register.password}
                  />
                  <Error text={errors?.password} />
                  <FaEye className={`absolute right-2 top-4 opacity-60 hover:opacity-100 cursor-pointer ${errors?.password ? "text-black" : "text-white"}`} onClick={() => setEyeClicked(!eyeClicked)} />
                </div>
                <div>
                  <TextInput
                    id="repeatPass"
                    type="password"
                    required={true}
                    shadow={true}
                    color="white"
                    style={styleInput(errors?.password)}
                    className="border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
                    name="repeatPassword"
                    value={form.repeatPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={text.register.repeat}
                  />
                </div>

                <Button type="submit" id="send_data" className={`${buttonBehavior} bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500`}>
                  {text.register.submit}
                </Button>

                <div className="flex flex-row justify-left text-xs md:text-sm mt-1">
                  <span className="w-fit">{text.register.already}</span>
                  <Link to={`${LOGIN}`} className="ml-2 text-pink-300 hover:underline w-fit text-left">{text.register.login}</Link>
                </div>
              </form>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Register;