import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";
import { Toaster, toast } from "react-hot-toast";
import { SIGNUP } from "../router/paths";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = dataState.users.find(
      (user) =>
        user.email === userData.email && user.password === userData.password
    );
    if (isValidated) {
      login(isValidated);
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

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token:" + response.credential);
  };
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1028595791747-g35j211ljte5olsej2jmvugv4uk0rbtc.apps.googleusercontent.com",
      casllback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("login_google_button"),
      { theme: "outline" }
    );
  }, []);

  return (
    <div className="h-full flex justify-center items-center">
      <div className="headphones-image"></div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md px-10 pb-8 pt-7 m-auto bg-neutral-700 rounded-md image-z "
        style={{ backgroundColor: "#333a44" }}
      >
        <p className="text-2xl font-bol align-content:center;">
          {text.login.title}{" "}
        </p>

        <input
          type="text"
          id="email"
          name="email"
          placeholder={text.login.email}
          className="border border-gray-500 rounded-lg text-black"
          onChange={handleInput}
          required={true}
          value={userData.email}
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder={text.login.password}
          className="border border-gray-500 rounded-lg text-black"
          onChange={handleInput}
          required={true}
          value={userData.password}
        />

        <p>
          {text.login.dontHaveAnAccount} <br />
          <Link
            to={`/${SIGNUP}`}
            className="ml-2 text-pink-300 hover:underline"
          >
            {text.login.register}
          </Link>
        </p>

        <div id="login_google_button" className="py-2 px-4 rounded-full">
          {text.login.singingoogle}
        </div>

        <button
          href="#"
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  text-white font-bold py-2 px-4 rounded-full"
        >
          {text.login.singin}
        </button>
      </form>
    </div>
  );
};

export default Login;
