import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAuthContext } from "../context/AuthContext";
import { useGlobalContext } from "../context/GlobalContext";



const Login = () => {
  const { text } = useLanguage();
  const { dataState }= useGlobalContext();
  const { reset, login} = useAuthContext();
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

    const isValidated= dataState.users.find((user) => user.email === userData.email && user.password === userData.password);
    if(isValidated) { 
      login(isValidated);
      console.log("Estas logueado")
    }else{console.log ("Email/Contraseña incorrectos!")}
    

   
  };
  
 
 

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md px-10 pb-8 pt-7 m-auto bg-neutral-700 rounded-md"
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
          <Link to="/signup">{text.login.register}</Link>
        </p>

        <button
          href="#"
          type="submit"
          className="bg-white text-black only: transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  font-bold py-2 px-4 rounded-full"
        >
          {text.login.singingoogle}
        </button>

        <button
          href="#"
          type="submit"
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110  text-white font-bold py-2 px-4 rounded-full"
        >
          {text.login.singin}
        </button>
      </form>
    </>
  );
};

export default Login;
