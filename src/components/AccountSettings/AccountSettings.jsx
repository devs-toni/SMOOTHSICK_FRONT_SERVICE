import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { HOME } from '../../router/paths'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Avatar, Button } from 'flowbite-react';
import { ChangePasswordModal } from './ChangePasswordModal/ChangePasswordModal';
import { ChangeUserNameModal } from './ChangeUserDataModal/ChangeUserDataModal';
import { ChangeEmailModal } from './ChangeEmailModal/ChangeEmailModal';
import { useFetchUserData } from '../../hooks/useFetchUserData';
import Swal from 'sweetalert2';


const Accountsettings = () => {
  const { text } = useLanguage()
  const { authState } = useAuth()
  const { user } = authState
  const [openChangePassModal, setOpenChangePassModal] = useState(false);
  const [openUserDataModal, setOpenUserDataModal] = useState(false);
  const [openEmaiModal, setOpenEmaiModal] = useState(false);
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

  const handleAdviceForGoogleUser = () => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'You can not modified the user name or password for a google account',
      background: '#18181b',
      confirmButtonColor: '#ef5567',
    })
  }

  

  return (
    <>
      <ChangePasswordModal setOpen={setOpenChangePassModal} open={openChangePassModal} />
      <ChangeUserNameModal setOpen={setOpenUserDataModal} open={openUserDataModal} />
      <ChangeEmailModal setOpen={setOpenEmaiModal} open={openEmaiModal} />
      <div className="headphones-image"></div>
      <div className="h-full p-4 md:ml-20 lg:ml-52">
        <div className="flex flex-col items-start my-20 md:px-20 justify-center gap-5">
          <div className='flex flex-col gap-10 w-full pb-5 border-b border-neutral-500'>
            <div className=''>
              <h3 className='text-2xl lg:text-4xl'>{text.account.account}</h3>
            </div>
            <div className="flex items-center gap-10">
              <Avatar
                img={user.profilePicture}
                size="xl"
                rounded
              />
              <div className="flex flex-col gap-3">
                <span className="text-lg md:text-xl xl:text-2xl font-thin inline-block">{`${text.account.name} : ${user.firstName}`}</span>
                <span className="text-lg md:text-xl xl:text-2xl font-thin inline-block">{`${text.account.lastname}: ${user.lastName}`}</span>
              </div>
            </div>
            <h3 className='text-2xl lg:text-4xl'> {text.account.account} </h3>
          </div>
          <div className='flex lg:gap-10 w-full pb-5 items-end'>
            <div className='flex flex-col w-56 md:w-full gap-3 border-b border-zinc-700'>
              <span>{text.register.username}</span>
              <div className='flex items-center lg:justify-between md:gap-5'>
                <input type="text" readOnly name="userName" value={authState.user.userName} className='bg-transparent text-lg w-64 md:w-80 lg:w-96' />
                <Button type='submit' className='bg-deezer hover:bg-deezer-dark w-40' name='userName' onClick={handleOpenUserDataModal}>
                  <span className='text-xs md:text-sm'>
                    {text.account.button_m}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          {
            authState.user.type === 'G-User'?
              <>
                <div className='flex lg:gap-10 w-full pb-5 items-end'>
                  <div className='flex flex-col w-56 md:w-full gap-3 border-b border-zinc-700'>
                    <span className='opacity-30'> {text.account.email} </span>
                    <div className='flex items-center lg:justify-between md:gap-5'>
                      <input type="email" readOnly name="userEmail" disabled value={authState.user.email} className='bg-transparent text-lg w-64 md:w-80 lg:w-96 opacity-30' />
                      <Button className='bg-deezer hover:bg-deezer-dark hover:blur-sm hover:opacity-30 w-40' name='userEmail' onClick={handleAdviceForGoogleUser}>
                        <span className='text-xs md:text-sm'>
                          {text.account.button_m}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='flex lg:gap-10 w-full pb-10 items-end '>
                  <div className='flex flex-col w-56 md:w-full gap-3 border-b border-zinc-700'>
                    <span className='opacity-30'> {text.account.password2}</span>
                    <div className='flex items-center lg:justify-between md:gap-5'>
                      <input type="password" readOnly name="userPassword" disabled defaultValue={"*****"} className='bg-transparent text-lg w-64 md:w-80 lg:w-96 opacity-30' />
                      <Button className='bg-deezer hover:bg-deezer w-40 hover:blur-sm hover:opacity-30' onClick={handleAdviceForGoogleUser}>
                        <span className='text-xs md:text-sm'>
                          {text.account.button_m}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
              :
              <>
                <div className='flex lg:gap-10 w-full pb-5 items-end'>
                  <div className='flex flex-col w-56 md:w-full gap-3 border-b border-zinc-700'>
                    <span> {text.account.email} </span>
                    <div className='flex items-center lg:justify-between md:gap-5'>
                      <input type="email" readOnly name="userEmail" value={authState.user.email} className='bg-transparent text-lg w-64 md:w-80 lg:w-96' />
                      <Button className='bg-deezer hover:bg-deezer-dark w-40' name='userEmail' onClick={handleOpenEmaiModal}>
                        <span className='text-xs md:text-sm'>
                          {text.account.button_m}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
                <div className='flex lg:gap-10 w-full pb-10 items-end '>
                  <div className='flex flex-col w-56 md:w-full gap-3 border-b border-zinc-700'>
                    <span> {text.account.password2}</span>
                    <div className='flex items-center lg:justify-between md:gap-5'>
                      <input type="password" readOnly name="userPassword" defaultValue={"*****"} className='bg-transparent text-lg w-64 md:w-80 lg:w-96' />
                      <Button className='bg-deezer hover:bg-deezer-dark w-40 ' onClick={handleOpenChangePassModal}>
                        <span className='text-xs md:text-sm'>
                          {text.account.button_m}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </>

          }

          {
            authState.user.role === "A"
              ?
              <Button className='bg-deezer w-40' onClick={reloadDb}>Reload Database</Button>
              :
              ""
          }
          <div className='flex lg:gap-10 justify-between w-full bg-zinc-900 rounded-xl p-10 mb-32 md:mb-0'>
            <Button className='bg-rose-700 hover:bg-rose-900 w-32 md:w-40' onClick={handleDeleteUser}>
              <span className='text-xs md:text-sm'>
                {text.account.erase_acc}
              </span>
            </Button>
            <Button className='bg-deezer hover:bg-deezer-dark w-32 md:w-40' onClick={handleRedirect}>
              <span className='text-xs md:text-sm'>
                {text.account.backtohome}
              </span>
            </Button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Accountsettings