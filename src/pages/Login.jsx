import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { toast } from "react-hot-toast";
import { SIGNUP } from "../router/paths";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import defaultUserPicture from "../assets/imgs/default_pictures/default_user_img.png"

const Login = () => {
  const { text } = useLanguage();
  const { dataState } = useGlobalContext();
  const { reset, login } = useAuthContext();
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const userFound = dataState.users.find((user) => user.email === userData.email && user.password === userData.password);
    if (userFound) {
      login({
        id: userFound.id,
        firstName: userFound.first_name,
        lastName: userFound.last_name,
        email: userFound.email,
        profilePicture: defaultUserPicture,
      });
      navigate("/");
    } 
    else {
      toast.error("Something Wrong...!", {
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
  };
  const setProfileOAuthGoogle = (profile) => {
    const { email, id } = profile;
    const isValid = (email, id);
    isValid && login(isValid.id, isValid.email);
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, password: isValid.password, email: email }));
    const userG = { email: email, password }
    console.log(userG)

  }


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
          navigate('/')
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });




  return (
    <div className="flex items-center flex-col justify-center h-full">
      {/* <div className="headphones-image">
      </div> */}
      <form
        onSubmit={handleSubmit}
        className="flex item-center flex-col gap-4 max-w-xl w-full m-4 register image-z"

      >
        <p className="text-2xl font-bol align-content:center;">
          {text.login.title}{" "}
        </p>
        <div>
          <TextInput
            type="text"
            id="email"
            name="email"
            placeholder={text.login.email}
            className="border focus:ring-0 border-t-transparent border-l-transparent border-r-transparent focus:border-transparent border-b-1 border-neutral-500 "
            onChange={handleInput}
            required={true}
            value={userData.email}
          />
        </div>
        <div>
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder={text.login.password}
            className=" border focus:ring-0 border-t-transparent border-l-transparent border-r-transparent focus:border-transparent border-b-1 border-neutral-500 "
            onChange={handleInput}
            required={true}
            value={userData.password}
          />
        </div>
        <p>
          {text.login.dontHaveAnAccount} <br />
          <Link
            to={`/${SIGNUP}`}
            className="ml-2 text-pink-300 hover:underline"
          >
            {text.login.register}
          </Link>
        </p>


        <button
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  text-white font-bold py-2 px-4 rounded-md"
        >
          {text.login.singin}
        </button>
      </form>
      <div className="flex item-center flex-row w-96">
        <button
          onClick={() => loginG()}
          className="bg-slate-50 transition duration-500 ease-in-out transform hover:-translate-y-1 text-black hover:scale-110 font-bold py-2 px-4 rounded-md "
        >
          {text.login.singingoogle}
        </button>
      </div>
    </div>
  );
};

export default Login;
