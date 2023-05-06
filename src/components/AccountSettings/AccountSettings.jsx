import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ACCOUNT, CHANGEPASS } from '../../router/paths'
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'flowbite-react';


const Accountsettings = () => {
  const { text } = useLanguage()
  const { authState } = useAuthContext()
  const { user } = authState
  const { email } = user
  const [userRole, setUserRole] = useState(Boolean)


  try {
    axios.post(import.meta.env.VITE_DB_URI_AUTHORIZATE, { user })
      .then((res) => setUserRole(res.data))
  } catch (error) {
    console.error(error)
  }

  const reloadDb = () => {
    axios.get(`http://localhost:4000/admin/reload`)
      .then((res) => console.log(res))
  }

  

  const forgotPassword = () => {
    try {
      axios.post(import.meta.env.VITE_DB_URI_FORGOT_PASSWORD, { email })
        .then((res) => console.log(res))
    } catch (error) {
      console.error(error);
    }
  }


  return (

    <div className='h-full flex flex-col md:ml-20 lg:ml-52'>
      <div className="headphones-image"></div>
      <div className="flex flex-col justify-around items-center pt-16 md:pt-56 gap-7 w-full m-auto mt-10 p-4 md:p-10 md:max-w-xl lg:max-w-3xl xl:max-w-6xl">
        <div className='grid grid-cols-1 md:grid-cols-3 justify-start items-start py-4 gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500 w-full'>
          <div className='flex flex-col'>

            <span> {text.account.account} </span>
            <button type="button" className="text-white h-16 w-32 bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">{text.account.cancel}</button>
          </div>
          <div className='flex flex-col'>
            <h1> {text.account.user}</h1>
            <div className='text-sm pt-3'>
              <p className='font-bold'> {text.account.name}  <span className='font-thin italic'> {authState.user.firstName} {authState.user.lastName} </span> </p>
              <p className='font-bold'>{text.account.email} <span className='font-thin italic'>{authState.user.email}</span></p>
              <p className='font-bold'>{text.account.password2} <span className='font-thin italic'>******</span></p>
            </div>
          </div>
          <div className='flex flex-col'>
            <Link to={`${CHANGEPASS}`}> <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{text.account.password}</span><br></br> </Link>
            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{text.account.edit} </a><br></br>
          </div>
        </div>
        <div className='grid grid-cols-3 justify-start items-center pb-6 gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500 w-full h-1/3'>
          <div>
            <p>{text.account.plan}</p>
          </div>
          <div><p>{text.account.subscription} </p></div>
          <div><a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{text.account.change_plan}</a></div>
        </div>
        <div className='grid grid-cols-3 justify-start items-center pb-6 gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500 w-full h-1/3'>
          <p>{text.account.security_p}</p>
          <p>{text.account.security_o}</p>
          {
            userRole
              ?
              <button onClick={reloadDb}>Reload Database</button>
              :
              ""
          }
          <Button
            onClick={forgotPassword}>
            {/* {text.account.forgot_password} */}
            Forgot Password
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Accountsettings