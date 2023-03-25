import { Dropdown } from 'flowbite-react';
import { Toaster, toast } from "react-hot-toast";
import { FaPhotoVideo, FaUserShield, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"
import { AiFillHome } from "react-icons/ai"
import { RiFolderMusicFill, RiMenu4Fill } from "react-icons/ri"
import { BiRadio } from "react-icons/bi"
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext, useLanguage } from '../../index';
import flagSpain from '../../assets/imgs/flags/spain.png'
import flagEngland from '../../assets/imgs/flags/united-kingdom.png'
import flagFrance from '../../assets/imgs/flags/france.png'
import flagChina from '../../assets/imgs/flags/china.png'
import exampleLogo from '../../assets/imgs/logo/logo-head.svg';
import { SIGNUP, LOGIN, SEARCH, ACCOUNT, FAVOURITES } from '../../router/paths'
import React, { useEffect, useState } from 'react';
import { HiUserCircle } from "react-icons/hi"


export const NavBar = () => {

  const { logout, authState } = useAuthContext();
  const { handleLanguage, text } = useLanguage();
  const [asideLinks, setAsideLinks] = useState([])

  const { user } = authState

  const lenguageSelected = [
    { key: 1, name: "spain", country: flagSpain },
    { key: 2, name: "united-kingdom", country: flagEngland },
    { key: 3, name: "france", country: flagFrance },
    { key: 4, name: "china", country: flagChina }
  ];



  useEffect(() => {
    authState.isAuthenticated
      ? setAsideLinks(
        [
          { key: 1, path: "/", icon: <AiFillHome color="#fff" className="h-6 w-6 " />, text: text.navbar.home },
          { key: 2, path: "/categories", icon: <RiFolderMusicFill color="#fff" className="h-6 w-6 " />, text: text.navbar.categories },
          { key: 3, path: "/radio", icon: <BiRadio color="#fff" className="h-6 w-6 " />, text: text.navbar.radio },
          { key: 4, path: "/video", icon: <FaPhotoVideo color="#fff" className="h-6 w-6 " />, text: text.navbar.video }
        ]
      )
      : setAsideLinks([
        { key: 1, path: "/", icon: <AiFillHome color="#fff" className="h-6 w-6 " />, text: text.navbar.home },
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
      <div className="fixed top-0 z-50 w-full md:bg-transparent md:shadow-none">
        <nav className="flex flex-row items-center justify-between p-3 md:p-3 pr-4 pl-4 pt-3 md:pr-8 md:pl-11 lg:pr-5 lg:pl-5 " >
          <NavLink to="/">
            <img className='h-12 w-14 hidden md:block cursor-pointer' src={exampleLogo} alt="" />
          </NavLink>
          <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none">
            <RiMenu4Fill className='h-6 w-6' />
          </button>

          <div className="flex flex-row justify-center items-center flex-wrap">
            <div>
              {
                authState.isAuthenticated
                  ?
                  <>
                    <Dropdown
                      className='bg-zinc-700 border-none px-0 py-0'
                      inline
                      label={<img src={user.profilePicture} className="w-8 rounded-full" />}
                      placement="top-start"
                      arrowIcon={false}
                    >
                      <React.Fragment key=".0">
                        <div className=" py-1 text-sm text-white text-center">
                          <span>{text.navbar.welcome} {user.firstName}!</span>
                        </div>
                        <Dropdown.Divider />
                        <NavLink to={`/${ACCOUNT}`} className={({ isActive }) => (isActive ? "opacity-40" : "")}>
                          <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white px-0 py-0 h-10 hover:text-black'>
                            <span className='text-center'>{text.navbar.dashboard}</span>
                          </Dropdown.Item>
                        </NavLink>
                        <NavLink to={`/${FAVOURITES}`} className={({ isActive }) => (isActive ? "opacity-40" : "")}>
                          <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white px-0 py-0 h-10 hover:text-black'>
                            <span>{text.liked.name}</span>
                          </Dropdown.Item>
                        </NavLink>
                        <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white py-0 h-10'>
                          <div className=" flex flex-row justify-center pl-2 items-center">
                            {
                              lenguageSelected.map((item) => (
                                <img
                                  key={item.key}
                                  src={item.country}
                                  alt={item.name + " flag"}
                                  name={item.name}
                                  className="h-6 m-1 cursor-pointer hover:scale-110 mr-2"
                                  onClick={handleApplyLenguage}
                                />
                              ))
                            }
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <div className='py-1 text-sm text-white text-center cursor-pointer'>
                          <li onClick={handleLogout}>
                            <span> {text.navbar.logout}</span>
                          </li>
                        </div>
                      </React.Fragment>
                    </Dropdown>
                  </>
                  :
                  <>
                    <Dropdown
                      className='bg-zinc-700 border-none px-0 py-0 mr-10'
                      inline
                      label=
                      {
                        <HiUserCircle
                          size={40}
                        />
                      }
                      placement="bottom-start"
                      arrowIcon={false}
                    >
                      <React.Fragment key=".0">
                        <NavLink to={`/${LOGIN}`}>
                          <Dropdown.Item className='flex justify-center items-center bg-zinc-700 text-white hover:text-black py-0 h-10'>
                            <span className='text-sm block'>{text.navbar.login}</span>
                          </Dropdown.Item>
                        </NavLink>
                        <NavLink to={`/${SIGNUP}`}>
                          <Dropdown.Item className=' flex justify-center items-center bg-zinc-700 text-white hover:text-black px-12 py-0 h-10'>
                            <span>{text.navbar.register}</span>
                          </Dropdown.Item>
                        </NavLink>
                        <Dropdown.Divider />
                        <div className="pl-2 flex flex-row justify-evenly">
                          {
                            lenguageSelected.map((item) => (
                              <img
                                key={item.key}
                                src={item.country}
                                alt={item.name + " flag"}
                                name={item.name}
                                className="h-6 m-1 cursor-pointer hover:scale-110 mr-2"
                                onClick={handleApplyLenguage}
                              />
                            ))
                          }
                        </div>
                      </React.Fragment>
                    </Dropdown>
                  </>
              }
            </div>
          </div>
        </nav>
      </div>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-full px-10 bg-primary-color md:bg-transparent h-screen transition-transform -translate-x-full md:translate-x-0 md:w-36 lg:w-24 max-h-100 min-h-max" aria-label="Sidebar">
        <div className="flex flex-col justify-around items-center h-full px-3 gap-3">
          <ul className="space-y-2 flex flex-col gap-7 mt-2 ">
            <div className='flex flex-col gap-6 md:rounded-full md:p-4 lg:rounded-full lg:p-4 '>

              {
                asideLinks.map((item) => (
                  <NavLink key={item.key} to={item.path} className={({ isActive }) => (isActive ? "opacity-40" : "")} data-drawer-hide="logo-sidebar" >
                    <li className='inline-flex gap-3 items-center hover:scale-110'>
                      {item.icon}
                      <span className=' md:hidden lg:hidden'>{item.text}</span>
                    </li>
                  </NavLink>
                ))
              }

              <NavLink to={`/${SEARCH}`} className={({ isActive }) => (isActive ? "opacity-40" : "")} data-drawer-hide="logo-sidebar">
                <li className='inline-flex gap-3 items-center hover:scale-110'>
                  <svg aria-hidden="true" className="w-5 h-5" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                  <span className=' md:hidden lg:hidden'>{text.navbar.search}</span>
                </li>
              </NavLink>
            </div>

            <div className='flex flex-col gap-6 md:rounded-full md:p-4 lg:rounded-full md:bg-box-icons lg:p-4 '>
              {
                !authState.isAuthenticated
                  ?
                  <>
                    <NavLink to={`/${LOGIN}`} className={({ isActive }) => (isActive ? "opacity-40" : "")} data-drawer-hide="logo-sidebar" >
                      <li className='inline-flex gap-3 items-center hover:scale-110 '>
                        <FaUserShield color="#fff" className="h-6 w-6 " />
                        <span className=' md:hidden lg:hidden' > {text.navbar.login}</span>
                      </li>
                    </NavLink>

                    <NavLink to={`/${SIGNUP}`} className={({ isActive }) => (isActive ? "opacity-40" : "")} data-drawer-hide="logo-sidebar" >
                      <li className='inline-flex gap-3 items-center hover:scale-110 '>
                        <FaUserPlus color="#fff" className="h-6 w-6 " />
                        <span className=' md:hidden lg:hidden' > {text.navbar.register}</span>
                      </li>
                    </NavLink>
                  </>
                  :

                  <li className='inline-flex gap-3 items-center hover:scale-125 cursor-pointer' onClick={handleLogout} data-drawer-hide="logo-sidebar">
                    <FiLogOut color="#fff" className="h-6 w-6" />
                    <span className=' md:hidden lg:hidden' > {text.navbar.logout}</span>
                  </li>
              }
            </div>
          </ul>
        </div>
      </aside>
    </>

  )
};

