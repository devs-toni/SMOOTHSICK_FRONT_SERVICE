import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ACCOUNT, CHANGEPASS, HOME } from '../../router/paths'
import axios from 'axios';
import { useState } from 'react';
import { Avatar, Button, TextInput } from 'flowbite-react';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal';
import { ChangeUserNameModal } from './ChangeUserDataModal/ChangeUserDataModal';


const Accountsettings = () => {
  const { text } = useLanguage()
  const { authState } = useAuth()
  const { user } = authState
  const { email, userName } = user
  const [userRole, setUserRole] = useState(Boolean)
  const [openChangePassModal, setOpenChangePassModal] = useState(false);
  const [openUserDataModal, setOpenUserDataModal] = useState(false);
  const [modalData, setModalData] = useState("")
  const navigate = useNavigate()
  // try {
  //   axios.post(import.meta.env.VITE_BACKEND + "users/authorizate", { user })
  //     .then((res) => setUserRole(res.data))
  // } catch (error) {
  //   console.error(error)
  // }

  const reloadDb = () => {
    axios.get(`${import.meta.env.VITE_BACKEND}admin/reload`)
      .then((res) => console.log(res))
  }

  // const forgotPassword = () => {
  //   try {
  //     axios.post(import.meta.env.VITE_DB_URI_FORGOT_PASSWORD, { email })
  //       .then((res) => console.log(res))
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleOpenChangePassModal = () => {
    setOpenChangePassModal(true)
  }

  const handleOpenUserDataModal = (reference) => {
    setModalData(reference)
    setOpenUserDataModal(true)
  }



  const handleRedirect = () => {
    navigate(HOME)
  }


  return (
    <>
      <ChangePasswordModal setOpen={setOpenChangePassModal} open={openChangePassModal} />
      <ChangeUserNameModal setOpen={setOpenUserDataModal} open={openUserDataModal} modalData={modalData} />
      <div className="headphones-image"></div>
      <div className="flex flex-col h-screen justify-center items-center md:ml-20 lg:ml-52">
        <div className="flex flex-col items-start md:px-20 w-full justify-center gap-5">
          <div className='flex flex-col gap-10 w-full pb-5 border-b border-neutral-500'>
            <div className='mb-10'>
              <h3 className='text-5xl'>Tu Cuenta</h3>
            </div>
            <div className="flex items-center gap-10">
              <Avatar
                img={user.profilePicture}
                rounded={true}
                size="lg"
                className='border  border-neutral-500 rounded-full p-5'
              />

              <div className="flex flex-col gap-3">
                <span className="text-3xl inline-block">{`Nombre: ${user.firstName}`}</span>
                <span className="text-3xl inline-block">{`Apellidos: ${user.lastName}`}</span>
              </div>
            </div>
            <h3 className='text-3xl'>Datos de usuario</h3>
          </div>
          <div className='flex gap-10 w-full pb-5 items-end'>
            <div className='flex flex-col w-full gap-3'>
              <span>User name</span>
              <input type="text" name="userName" defaultValue={user.userName} className='bg-zinc-900 w-full' />
            </div>
            <Button type='submit' className='bg-deezer w-40' name='userName' onClick={() => handleOpenUserDataModal("userName")}>Modificar</Button>
          </div>
          <div className='flex gap-10 w-full pb-5 items-end'>
            <div className='flex flex-col w-full gap-3'>
              <span>Email</span>
              <input type="email" name="userEmail" defaultValue={user.email} className='bg-zinc-900 w-full' />
            </div>
            <Button className='bg-deezer w-40' name='userEmail' onClick={() => handleOpenUserDataModal("userEmail")}>Modificar</Button>
          </div>
          <div className='flex gap-10 w-full pb-5 items-end border-b border-neutral-500 '>
            <div className='flex flex-col w-full gap-3'>
              <span>Password</span>
              <input type="password" name="userPassword" defaultValue={"*****"} className='bg-zinc-900 w-full'/>
            </div>
            <Button className='bg-deezer hover:bg-deezer-dark w-40' onClick={handleOpenChangePassModal}>Modificar </Button>
          </div>
          {
            authState.user.role === "A"
              ?
              <Button className='bg-deezer w-40' onClick={reloadDb}>Reload Database</Button>
              :
              ""
          }
          <div className='flex gap-10 justify-between w-full'>
            <Button className='bg-rose-800 w-40'>Borrar cuenta</Button>
            <Button className='bg-deezer w-40' onClick={handleRedirect}>Volver a Home</Button>
          </div>


          {/* <div className='grid grid-cols-1 md:grid-cols-3 justify-start items-start py-4 gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500 w-full'>
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
              authState.user.role === "A"
                ?
                <button onClick={reloadDb}>Reload Database</button>
                :
                ""
            }
            <Button
              onClick={handleOpenModal}
              className='bg-deezer w-50'
            >
              {text.account.forgot_password}

              Forgot Password
            </Button>
          </div> */}


        </div>
      </div>

    </>
  )
}

export default Accountsettings