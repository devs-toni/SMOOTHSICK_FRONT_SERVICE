import { Button, Label, TextInput } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext";
import { FaEye } from 'react-icons/fa';
import { useForm } from "../hooks/useForm";
import { Link } from "react-router-dom";
import { LOGIN } from "../router/paths";
import Error from "../components/NavBar/Register/Error";


const Register = () => {

  const { text } = useLanguage();
  const { form, handleChange, handleBlur, validate, errors } = useForm({
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentErrors = validate();
    /*     console.log(Object.keys(currentErrors))
        console.log(Object.keys(currentErrors).map(v => currentErrors[v].length))
        console.log(Object.keys(currentErrors).map(v => currentErrors[v].length).filter(e => e !== 0).length) */
    if (Object.keys(currentErrors).map(v => currentErrors[v].length).filter(e => e !== 0).length === 0) {
      console.log('Registrando usuario');
    }
  }

  const styleInput = (err) => {
    return {
      backgroundColor: !err ? "#4B5563" : "#fff",
      border: err ? "1px solid red" : "1px solid #d0d0d025",
      color: err ? 'red' : 'white'
    }
  };

  return (
    <form className="flex flex-col gap-4 max-w-lg px-10 pb-8 pt-7 m-auto rounded-md "
      style={{ backgroundColor: "#333a44" }} onSubmit={handleSubmit}>
      <p className="text-2xl font-semibold">{text.register.title}</p>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerName"
            value={`* ${text.register.name}`}
          />
        </div>
        <TextInput
          id="registerName"
          type="text"
          required={true}
          shadow={true}
          color="#fff"
          style={styleInput(errors?.name)}
          className={`border border-gray-500 rounded-lg ${errors.name && 'text-red-400 '}`}
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error text={errors?.name} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerLastname"
            value={text.register.lastname}
          />
        </div>
        <TextInput
          id="registerLastname"
          type="text"
          required={false}
          shadow={true}
          color="white"
          style={styleInput(errors?.lastname)}
          className="border border-gray-500 rounded-lg"
          name="lastname"
          value={form.lastname}
          onChange={handleChange}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerEmail"
            value={`* ${text.register.email}`}
          />
        </div>
        <TextInput
          id="registerEmail"
          type="text"
          required={true}
          shadow={true}
          color="white"
          style={styleInput(errors?.email)}
          className="border border-gray-500 rounded-lg"
          name="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error text={errors?.email} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color="white"
            htmlFor="registerUsername"
            value={`* ${text.register.username}`}
          />
        </div>
        <TextInput
          id="registerUsername"
          type="text"
          required={true}
          shadow={true}
          color="white"
          style={styleInput(errors?.username)}
          className="border border-gray-500 rounded-lg"
          name="username"
          value={form.username}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error text={errors?.username} />
      </div>
      <div className="relative">
        <div className="mb-2 block">
          <Label
            color='white'
            htmlFor="registerPassword"
            value={`* ${text.register.password}`}
          />
        </div>
        <TextInput
          id="registerPassword"
          type="password"
          required={true}
          shadow={true}
          color="white"
          style={styleInput(errors?.password)}
          className="border border-gray-500 rounded-lg"
          name="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Error text={errors?.password} />
        <FaEye className="absolute right-4 top-11 opacity-60 hover:opacity-100 cursor-pointer" />
      </div>
      <div>
        <div className="mb-2 block">
          <Label
            color='white'
            htmlFor="repeatPass"
            value={`* ${text.register.repeat}`}
          />
        </div>
        <TextInput
          id="repeatPass"
          type="password"
          required={true}
          shadow={true}
          color="white"
          style={styleInput(errors?.password)}
          className="border border-gray-500 rounded-lg"
          name="repeatPassword"
          value={form.repeatPassword}
          onChange={handleChange}
          onBlur={handleBlur}
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
        <Link to={`/${LOGIN}`} className="ml-2 text-pink-300 hover:underline">{text.register.login}</Link>
      </div>
    </form>
  )
}

export default Register;