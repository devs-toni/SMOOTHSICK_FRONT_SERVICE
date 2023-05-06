import { Button, TextInput } from "flowbite-react";
import { useLanguage } from "../../context/LanguageContext";
import { useState } from "react";

export const Recover = () => {

  const [userData, setUserData] = useState({
    new1: "",
    new2: "",
  });
  const { text } = useLanguage();

  const handleInput = ({ target }) => {
    const { name, value } = target;
    setUserData({ ...userData, [name]: value });
    reset();
  };


  const handleSubmit = (e) => {
    e.preventDefault();
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
          onSubmit={handleSubmit}
          className="flex item-center flex-col gap-4 max-w-xl w-full px-10 pt-10 m-4 rounded-md register image-z"
        >
          <div>
            <TextInput
              type="text"
              id="newPass1"
              name="new1"
              placeholder={text.recover.new1}
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
              id="newPass2"
              name="new2"
              placeholder={text.recover.new2}
              color="white"
              className="text-white border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
              onChange={handleInput}
              required={true}
              value={userData.password}
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
