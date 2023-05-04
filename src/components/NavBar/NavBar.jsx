import { Dropdown } from 'flowbite-react';
import { Toaster, toast } from "react-hot-toast";
import { FaPhotoVideo, FaUserShield, FaUserPlus, FaSearch } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"
import { AiFillHome } from "react-icons/ai"
import { RiFolderMusicFill, RiLoginBoxLine, RiMenu4Fill } from "react-icons/ri"
import { BiLogOut, BiRadio } from "react-icons/bi"
import { Link, NavLink, useLocation } from 'react-router-dom';
import flagSpain from '../../assets/imgs/flags/spain.png'
import flagEngland from '../../assets/imgs/flags/united-kingdom.png'
import flagFrance from '../../assets/imgs/flags/france.png'
import flagChina from '../../assets/imgs/flags/china.png'
import logo from '../../assets/imgs/logo/logo-no-background.svg'
import logo_text from '../../assets/imgs/logo/logo-text-no-background.svg'
import { SIGNUP, LOGIN, SEARCH, ACCOUNT, FAVOURITES, HOME, CATEGORIES, RADIO, VIDEO, ALBUM, PLAYLIST, ARTIST } from '../../router/paths'
import { Fragment, useEffect, useState } from 'react';
import { HiUserCircle } from "react-icons/hi"
import { TbSearch } from "react-icons/tb"
import { MdOutlineLogout } from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';


export const NavBar = () => {
  const { logout, authState } = useAuthContext();
  const { handleLanguage, text } = useLanguage();
  const [asideLinks, setAsideLinks] = useState([])

  const { user } = authState

  const lenguageSelected = [
    { key: 1, name: "spain", code: "es", country: flagSpain },
    { key: 2, name: "united-kingdom", code: "en", country: flagEngland },
    { key: 3, name: "france", code: "fr", country: flagFrance },
    { key: 4, name: "china", code: "chn", country: flagChina }
  ];



  useEffect(() => {
    authState.isAuthenticated
      ? setAsideLinks(
        [
          { key: 1, path: HOME, icon: <AiFillHome className="h-6 w-6 " />, text: text.navbar.home },
          { key: 2, path: CATEGORIES, icon: <RiFolderMusicFill className="h-6 w-6 " />, text: text.navbar.categories },
          { key: 3, path: RADIO, icon: <BiRadio className="h-6 w-6 " />, text: text.navbar.radio },
          { key: 4, path: VIDEO, icon: <FaPhotoVideo className="h-6 w-6 " />, text: text.navbar.video },
          { key: 5, path: SEARCH, icon: <TbSearch className="h-6 w-6" />, text: text.navbar.search }
        ]
      )
      : setAsideLinks(
        [
          { key: 1, path: HOME, icon: <AiFillHome className="h-6 w-6 " />, text: text.navbar.home },
          { key: 2, path: SEARCH, icon: <TbSearch className="h-6 w-6 " />, text: text.navbar.search },
          { key: 3, path: LOGIN, icon: <FaUserShield className="h-6 w-6 " />, text: text.navbar.login },
          { key: 4, path: SIGNUP, icon: <FaUserPlus className="h-6 w-6 " />, text: text.navbar.register }
        ]
      )
  }, [authState.isAuthenticated])



  const handleLogout = () => {
    logout(null)
    toast.success('Log out successfully!',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        success: {
          duration: 2000
        }
      }
    )
  }

  const handleApplyLenguage = ({ target }) => {

    if (target.name === "spain") {
      handleLanguage(target)
    } else if (target.name === "united-kingdom") {
      handleLanguage(target)
    } else if (target.name === "france") {
      handleLanguage(target)
    } else {
      handleLanguage(target)
    }
  }

  return (
    <>
      <Toaster />
      <div className="fixed top-0 z-50 md:z-30 w-full bg-zinc-900 md:shadow-none">
        <nav className="flex border-b border-neutral-700 flex-row-reverse items-center justify-between p-3 pr-4 pl-4 md:pr-4 md:pl-4 lg:pr-5 lg:pl-5 md:flex-row-reverse">
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center hover:text-deezer text-sm text-gray-500 rounded-lg md:hidden focus:outline-none">
            <RiMenu4Fill className='h-6 w-6' />
          </button>
          <div className="flex flex-row justify-center items-center flex-wrap">
            <div>
              <>
                <Dropdown
                  className='bg-zinc-700 border-none px-0 py-0'
                  inline
                  id="user-drop-id"
                  label={authState.isAuthenticated ? <img src={user.profilePicture} className="w-10 rounded-full" /> : <HiUserCircle size={40}
                  />}
                  placement="top-start"
                  arrowIcon={false}
                >
                  <Fragment key=".0">
                    <div className="min-w-180">
                      {
                        authState.isAuthenticated &&
                        <>
                          <div className=" py-1 text-sm text-white text-center">
                            <span>{text.navbar.welcome} {user.firstName}!</span>
                          </div>
                          <Dropdown.Divider />
                        </>
                      }
                      {
                        authState.isAuthenticated ?
                          <>
                            <NavLink to={ACCOUNT} className={({ isActive }) => (isActive ? "opacity-40" : "")}>
                              <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white px-16 py-0 h-10 hover:text-black'>
                                <span className='text-center'>{text.navbar.dashboard}</span>
                              </Dropdown.Item>
                            </NavLink>
                            <NavLink to={FAVOURITES} className={({ isActive }) => (isActive ? "opacity-40" : "")}>
                              <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white px-0 py-0 h-10 hover:text-black'>
                                <span>{text.liked.name}</span>
                              </Dropdown.Item>
                            </NavLink>
                          </>
                          :
                          <>
                            <NavLink to={LOGIN}>
                              <Dropdown.Item className='w-full flex justify-center items-center bg-zinc-700 text-white hover:text-black px-0 py-0 h-10'>
                                <span className='text-sm block w-full text-center'>{text.navbar.login}</span>
                              </Dropdown.Item>
                            </NavLink>
                            <NavLink to={SIGNUP}>
                              <Dropdown.Item className=' flex justify-center items-center bg-zinc-700 text-white hover:text-black px-0 py-0 h-10'>
                                <span>{text.navbar.register}</span>
                              </Dropdown.Item>
                            </NavLink>
                            <Dropdown.Divider />
                          </>
                      }
                      
                      <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white py-0 h-10'>
                        <div className=" flex flex-row justify-center pl-2 items-center">
                          {
                            lenguageSelected.map((item) => (
                              <img
                                key={item.key}
                                src={item.country}
                                alt={item.name + " flag"}
                                name={item.code}
                                className="h-6 m-1 cursor-pointer hover:scale-110 mr-2"
                                onClick={handleApplyLenguage}
                              />
                            ))
                          }
                        </div>
                      </Dropdown.Item>
                      {
                        authState.isAuthenticated &&
                        <>
                          <Dropdown.Divider />
                          <Dropdown.Item className='py-1 text-sm text-white cursor-pointer w-full text-center' onClick={handleLogout}>
                            <span className='w-full text-center'>{text.navbar.logout}</span>
                          </Dropdown.Item>
                        </>
                      }
                    </div >
                  </Fragment>
                </Dropdown>
              </>
            </div>
          </div>
        </nav >
      </div >
sdfg
      <aside id="logo-sidebar" className="flex bg-zinc-900 flex-col justify-center h-full w-full items-center fixed top-0 z-40 bg-primary-color transition-transform -translate-x-full md:translate-x-0 md:w-20 md:border-r md:border-neutral-700 lg:w-52" aria-label="Sidebar">
        <div className='flex flex-row mt-4 justify-content-center h-10 items-center '>
          <NavLink to="/" className="hidden md:block lg:hidden cursor-pointer">
            <img src={logo} alt="logo" className='w-12 lg:mr-5 lg:w-14' />
          </NavLink>
          <NavLink to="/" className="hidden md:hidden lg:block cursor-pointer">
            <img src={logo_text} alt="logo" className='w-12 lg:mr-5 lg:w-28' />
          </NavLink>
        </div>
        <div className="h-full w-full">
          <ul className="space-y-2 flex flex-col gap-7 h-full justify-start mt-28 items-center ">
            <section className='flex flex-col gap-6 lg:w-full items-left text-sm  '>
              {
                asideLinks.map((item) => (
                  <NavLink key={item.key} to={item.path} className={({ isActive }) => (isActive ? "flex justify-center left-0 lg:border-l-8  border-deezer text-deezer" : "flex justify-center hover:text-deezer")} data-drawer-hide="logo-sidebar" >
                    <li className='inline-flex gap-2 items-center w-full lg:w-32 justify-left '>
                      {item.icon}
                      <span className=" md:hidden lg:block">{item.text}</span>
                    </li>
                  </NavLink>
                ))
              }

            </section>
            <section className='flex items-center justify-center gap-20 w-full'>
              <div className='flex flex-col ml-6 md:ml-0 justify-center gap-6 h-full lg:w-full '>
                {
                  authState.isAuthenticated
                    ?
                    <>

                      <NavLink to={ARTIST} className={({ isActive }) => (isActive ? " flex justify-center left-0 lg:border-l-8  border-deezer text-deezer" : "flex justify-center hover:text-deezer")}>
                        <li className='inline-flex gap-3 w-full lg:w-16 md:justify-left'>
                          <span className='md:hidden lg:block cursor-pointer'>{text.filters.artists}</span>
                        </li>
                      </NavLink>
                      <NavLink to={ALBUM} className={({ isActive }) => (isActive ? " flex justify-center left-0 lg:border-l-8  border-deezer text-deezer" : "flex justify-center hover:text-deezer")}>
                        <li className='inline-flex gap-3 w-full lg:w-16 justify-left'>
                          <span className='md:hidden lg:block cursor-pointer'>{text.filters.albums}</span>
                        </li>
                      </NavLink>
                      <NavLink to={PLAYLIST} className={({ isActive }) => (isActive ? " flex justify-center left-0 lg:border-l-8  border-deezer text-deezer" : "flex justify-center hover:text-deezer")}>
                        <li className='inline-flex gap-3 w-full lg:w-16 justify-left'>
                          <span className='md:hidden lg:block cursor-pointer'>{text.filters.playlists}</span>
                        </li>
                      </NavLink>
                      <NavLink to={FAVOURITES} className={({ isActive }) => (isActive ? " flex justify-center left-0 lg:border-l-8 border-deezer text-deezer " : "flex justify-center hover:text-deezer")}>
                        <li className='inline-flex gap-3 w-full lg:w-16 justify-left'>
                          <span className='md:hidden lg:block cursor-pointer'>{text.liked.name}</span>
                        </li>
                      </NavLink>
                    </>
                    :
                    <>
                      <NavLink to={ARTIST} className={({ isActive }) => (isActive ? " flex justify-center left-0 lg:border-l-8  border-deezer text-deezer" : "flex justify-center hover:text-deezer")}>
                        <li className='inline-flex gap-3 w-full lg:w-16 md:justify-left'>
                          <span className='md:hidden lg:block cursor-pointer'>{text.filters.artists}</span>
                        </li>
                      </NavLink>
                      <NavLink to={ALBUM} className={({ isActive }) => (isActive ? " flex justify-center left-0 lg:border-l-8 border-deezer text-deezer" : "flex justify-center hover:text-deezer")}>
                        <li className='inline-flex gap-3 w-full lg:w-16 justify-left'>
                          <span className='md:hidden lg:block cursor-pointer'>{text.filters.albums}</span>
                        </li>
                      </NavLink>
                    </>
                }
              </div>
            </section>
            {
              authState.isAuthenticated &&
              <div className='flex flex-col items-center gap-6 md:pt-4 lg:w-full  hover:text-deezer'>
                <li className='inline-flex pr-2 md:pr-0 gap-3 w-full lg:w-32 cursor-pointer text-center ' onClick={handleLogout} data-drawer-hide="logo-sidebar">
                  <MdOutlineLogout className="inline-flex h-6 w-6 justify-center lg:justify-left" />
                  <span className=' md:hidden lg:block'> {text.navbar.logout}</span>
                </li>
              </div>
            }
          </ul>
        </div >
      </aside >
    </>

  )
};

