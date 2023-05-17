import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { HOME, LOGIN, SIGNUP } from "../../router/paths";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import defaultUserPicture from "../../assets/imgs/default_pictures/default_user_img.png";
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import RecoverModal from "../RecoverModal/RecoverModal";
import Swal from "sweetalert2";


const Login = () => {
  const location = useLocation();
  const { text } = useLanguage();
  const { reset, login } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
    reset();
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(import.meta.env.VITE_BACKEND + "users/authenticate", { userData })
        .then(({ data, status }) => {
          const { token, currentUser } = data;
          if (status === 200) {
            login(currentUser._id, {
              id: currentUser._id,
              firstName: currentUser.name,
              lastName: currentUser.last_name,
              userName: currentUser.user_name,
              email: currentUser.email,
              role: currentUser.role,
              profilePicture: defaultUserPicture,
            }, token);
            toast.success('Log in successfully!',
              {
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  duration: 2000
                }
              }
            )
            localStorage.setItem("userToken", token)
            navigate(HOME);

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
        }).catch((err) => {
          if (err.response.status === 401) {
            toast.error("Incorrect login data!", {
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
          else {
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
        })
    } catch (error) {
      console.error(error)
    }
  };


  const setProfileOAuthGoogle = (profile) => {
    const { email, id, given_name, family_name, picture } = profile;
    const user = {
      id,
      firstName: given_name,
      lastName: family_name,
      email,
      profilePicture: picture,
    }
    if (user) {
      try {
        axios.post(import.meta.env.VITE_BACKEND + "users/authenticateGoogle", user)
          .then(({ status, data }) => {
            const { token, userGoogle } = data
            if (status === 201) {
              login(userGoogle._id, {
                id: userGoogle._id,
                firstName: userGoogle.name,
                lastName: userGoogle.last_name,
                userName: userGoogle.user_name,
                email: userGoogle.email,
                role: userGoogle.role,
                profilePicture: userGoogle.picture,
              }, token);
              toast.success('Log in successfully!',
                {
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                  success: {
                    duration: 2000
                  }
                }
              )
              localStorage.setItem("userToken", token)
              navigate(HOME);
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
          }).catch((err) => {
            if (err.response.status === 409) {
              Swal.fire({
                title: 'There is already a Smoothsick account associated with this email!',
                text: 'Recover your password in this section',
                width: 600,
                icon: 'error',
                background: '#18181b',
                confirmButtonColor: '#ef5567',
              })
            }
          })



      } catch (error) {
        console.error(error)
      }

    }

  };


  const loginG = useGoogleLogin({

    onSuccess: (codeResponse) => {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: "application/json",
            },
          }
        )

        .then((res) => {
          setProfileOAuthGoogle(res.data);
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),

  },

  );

  const styleInput = {
    backgroundColor: "#00000000"
  };

  const [open, setOpen] = useState(false)


  return (
    <div className="h-full flex justify-center items-center md:ml-20 lg:ml-52">
      <div className="headphones-image"></div>
      <RecoverModal open={open} setOpen={setOpen} />
      <div className="flex flex-col items-center justify-center h-full pt-20 w-full">
        <p className="text-lg md:text-4xl font-semibold mb-12">{text.login.title}</p>
        <form
          onSubmit={handleSubmit}
          className="flex item-center flex-col gap-4 max-w-xl w-full px-10 pt-10 m-4 rounded-md register image-z"
        >
          <div>
            <TextInput
              type="text"
              id="email"
              name="email"
              placeholder={text.login.email}
              className=" border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
              onChange={handleInput}
              color="white"
              required={true}
              value={userData.email}
              style={styleInput}
            />
          </div>
          <div>
            <TextInput
              type="password"
              id="password"
              name="password"
              placeholder={text.login.password}
              color="white"
              className="text-white border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
              onChange={handleInput}
              required={true}
              value={userData.password}
              style={styleInput}
            />
          </div>
          <p className="flex text-xs md:text-sm">
            {text.login.dontHaveAnAccount} <br />
            <Link
              to={`${SIGNUP}`}
              className=" ml-2 text-pink-300 hover:underline text-xs md:text-sm"
            >
              {text.login.register}
            </Link>
          </p>
          <div>
            <Label htmlFor="agree" color="white" className="w-full text-xs md:text-sm font-normal text-pink-300  flex justify-left">
              <button type="button" onClick={() => setOpen(true)}>
                {text.register.forget}
              </button>
            </Label>
          </div>
          <Button
            className="text-xs md:text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500 ease-in-out transform text-white font-bold"
            type="submit"
          >
            {text.login.singin}
          </Button>
          <Button
            onClick={loginG}
            color="black"
            className="text-xs md:text bg-slate-50  transition duration-500 ease-in-out transform text-black font-bold"
          >
            {text.login.singingoogle}
          </Button>
        </form>
        <div className="flex item-center w-3/12 ">
        </div>
      </div>
    </div>
  )
}

export default Login