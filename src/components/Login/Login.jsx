import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { SIGNUP } from "../../router/paths";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button, TextInput } from "flowbite-react";
import defaultUserPicture from "../../assets/imgs/default_pictures/default_user_img.png";
import { useLanguage, useAuthContext, useGlobalContext } from '../../index';

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
    const userFound = dataState.users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (userFound) {
      login(userFound.id, {
        id: userFound.id,
        firstName: userFound.first_name,
        lastName: userFound.last_name,
        email: userFound.email,
        profilePicture: defaultUserPicture,
      });
      navigate("/");
    } else {
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
    const { email, id, given_name, family_name, picture } = profile;
    console.log(email, id, given_name, family_name, picture);
    const user = {
      id,
      firstName: given_name,
      lastName: family_name,
      email,
      profilePicture: picture,
    }
    if (profile) {
      login(id, user);
      localStorage.setItem(
        "auth",
        JSON.stringify(
          user
        )
      );
    }
    const userG = { email, password };
    console.log(userG);
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
          navigate("/");
        })
        .catch((err) => console.log(err));
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const styleInput = {
    backgroundColor: "#00000000"
  };


  return (
    <div className="h-full flex justify-center items-center md:ml-20 lg:ml-52">
      <div className="headphones-image"></div>
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