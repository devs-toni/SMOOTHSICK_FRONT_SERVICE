import { Button, Label, TextInput } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext";
import { FaEye } from 'react-icons/fa';

const styleInput = {
  backgroundColor: "#4B5563",
  //  border: "1px solid white"
}
const Register = () => {

  const { text } = useLanguage();

  return (
    <form className="flex flex-col gap-4 max-w-lg px-10 pb-8 pt-7 m-auto rounded-md "
      style={{ backgroundColor: "#333a44" }}>
      <p className="text-2xl font-semibold">{text.register.title}</p>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerName"
            value={text.register.name}
            className="font-small"
          />
        </div>
        <TextInput
          id="registerName"
          type="text"
          required={true}
          shadow={true}
          color="#fff"
          style={styleInput}
          className="border border-gray-500 rounded-lg"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerLastname"
            value={text.register.lastname}
            className="font-small"
          />
        </div>
        <TextInput
          id="registerLastname"
          type="text"
          required={true}
          shadow={true}
          color="white"
          style={styleInput}
          className="border border-gray-500 rounded-lg"
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerEmail"
            value={text.register.email}
            className="font-small"
          />
        </div>
        <TextInput
          id="registerEmail"
          type="email"
          required={true}
          shadow={true}
          color="white"
          style={styleInput}
          className="border border-gray-500 rounded-lg"
        />
      </div>
      <div className="relative">
        <div className="mb-2 block">
          <Label
            color='white'
            htmlFor="registerPassword"
            value={text.register.password}
            className="font-small"
          />
        </div>
        <TextInput
          id="registerPassword"
          type="password"
          required={true}
          shadow={true}
          color="white"
          style={styleInput}
          className="border border-gray-500 rounded-lg"
        />
        <FaEye className="absolute right-4 top-11 opacity-60 hover:opacity-100 cursor-pointer" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color='white'
            htmlFor="repeatPassword"
            value={text.register.repeat}
            className="font-small"
          />
        </div>
        <TextInput
          id="repeatPassword"
          type="password"
          required={true}
          shadow={true}
          color="white"
          style={styleInput}
          className="border border-gray-500 rounded-lg"
        />
      </div>
      <div className="gap-2 text-left">
        <Label htmlFor="agree" color="white" className="w-full font-normal">
          <a
            href="/forms"
            className="text-pink-300 hover:underline"
          >
            {text.register.forget}
          </a>
        </Label>
      </div>
      <Button type="submit" className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {text.register.submit}
      </Button>
      <div className="flex text-sm mt-1">
        <span className="w-fit">{text.register.already}</span>
        <a href="#" className="ml-2 text-pink-300 hover:underline">{text.register.login}</a>
      </div>
    </form>
  )
}

export default Register;