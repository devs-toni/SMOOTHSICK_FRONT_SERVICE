import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ACCOUNT, CHANGEPASS, HOME } from '../../router/paths'
import axios from 'axios';
import { useState } from 'react';
import { Avatar, Button, TextInput } from 'flowbite-react';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal';
import { ChangeUserNameModal } from './ChangeUserDataModal/ChangeUserDataModal';
import { ChangeEmailModal } from './ChangeEmailModal/ChangeEmailModal';
import Swal from 'sweetalert2';
import { useFetchUserData } from '../../context/useFetchUserData';
import { set } from 'react-hook-form';


const Accountsettings = () => {
  const { text } = useLanguage()
  const { authState } = useAuth()
  const { user } = authState
  const { email, userName, id } = user
  const [userRole, setUserRole] = useState(Boolean)
  const [openChangePassModal, setOpenChangePassModal] = useState(false);
  const [openUserDataModal, setOpenUserDataModal] = useState(false);
  const [openEmaiModal, setOpenEmaiModal] = useState(false);
  const [modalData, setModalData] = useState("")
  const navigate = useNavigate()
  const { deleteUser } = useFetchUserData()


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

  const handleOpenChangePassModal = () => {
    setOpenChangePassModal(true)
  }

  const handleOpenUserDataModal = () => {
    setOpenUserDataModal(true)
  }

  const handleOpenEmaiModal = () => {
    setOpenEmaiModal(true)

  }

  const handleRedirect = () => {
    navigate(HOME)
  }

  const handleDeleteUser = () => {
    deleteUser()
  }


  return (
    <>
      <ChangePasswordModal setOpen={setOpenChangePassModal} open={openChangePassModal} />
      <ChangeUserNameModal setOpen={setOpenUserDataModal} open={openUserDataModal} />
      <ChangeEmailModal setOpen={setOpenEmaiModal} open={openEmaiModal} />
      <div className="headphones-image"></div>
      <div className="flex flex-col h-screen justify-center items-center md:ml-20 lg:ml-52">
        <div className="flex flex-col items-start md:px-20 w-9/12 justify-center gap-5">
          <div className='flex flex-col gap-10 w-full pb-5 border-b border-neutral-500'>
            <div className=''>
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
                <span className="text-2xl font-thin inline-block">{`Nombre: ${user.firstName}`}</span>
                <span className="text-2xl font-thin inline-block">{`Apellidos: ${user.lastName}`}</span>
              </div>
            </div>
            <h3 className='text-3xl'>Datos de usuario</h3>
          </div>
          <div className='flex gap-10 w-full pb-5 items-end'>
            <div className='flex flex-col w-full gap-3 border-b border-zinc-700'>
              <span>User name:</span>
              <input type="text" readOnly name="userName" defaultValue={user.userName} className='bg-transparent text-xl w-96' />
            </div>
            <Button type='submit' className='bg-deezer hover:bg-deezer-dark w-40' name='userName' onClick={handleOpenUserDataModal}>Modificar</Button>
          </div>
          <div className='flex gap-10 w-full pb-5 items-end'>
            <div className='flex flex-col w-full gap-3 border-b border-zinc-700'>
              <span>Email:</span>
              <input type="email" readOnly name="userEmail" defaultValue={user.email} className='bg-transparent text-xl w-96' />
            </div>
            <Button className='bg-deezer hover:bg-deezer-dark w-40' name='userEmail' onClick={handleOpenEmaiModal}>Modificar</Button>
          </div>
          <div className='flex gap-10 w-full pb-10 items-end '>
            <div className='flex flex-col w-full gap-3 border-b border-zinc-700'>
              <span>Password:</span>
              <input type="password" readOnly name="userPassword" defaultValue={"*****"} className='bg-transparent text-xl w-96' />
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
          <div className='flex gap-10 justify-between w-full bg-zinc-900 rounded-xl p-10'>
            <Button className='bg-rose-700 hover:bg-rose-900 w-40' onClick={handleDeleteUser}>Borrar cuenta</Button>
            <Button className='bg-deezer hover:bg-deezer-dark w-40' onClick={handleRedirect}>Volver a Home</Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Accountsettings