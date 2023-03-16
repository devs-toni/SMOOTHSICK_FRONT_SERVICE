import { Avatar, Sidebar } from 'flowbite-react';
import { FaPhotoVideo } from "react-icons/fa";
import { AiFillHome, AiOutlineUser } from "react-icons/ai"
import { RiFolderMusicFill, RiMenu4Fill } from "react-icons/ri"
import { BiRadio } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import React from 'react';
import flagSpain from '../../assets/imgs/flags/spain.png'
import flagEngland from '../../assets/imgs/flags/united-kingdom.png'
import flagFrance from '../../assets/imgs/flags/france.png'
import { NavLink } from 'react-router-dom';


export const NavBar = () => {
	return (

		<>
			<nav className="fixed top-0 z-50 w-full bg-zinc-700 ">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 bg-neutral-800 rounded-lg md:hidden  focus:outline-none">
								<RiMenu4Fill className='h-6 w-6' />
							</button>
						</div>
							<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
								</div>
								<input type="search" className=" bg-neutral-800 text-white block w-80  p-4 pl-10 text-sm text-gray-900 border border-none focus:ring-0 rounded-lg bg-gray-50" placeholder="Find new music..." required />
							</div>

						<div className="flex items-center">
							<div className="flex items-center ml-3">
								<div>
									<div className="flex justify-center items-center flex-wrap ">
										<Avatar
											img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											rounded={true}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-60 backdrop-blur-sm bg-white/30 h-screen transition-transform -translate-x-full md:translate-x-0 md:w-40 lg:w-24" aria-label="Sidebar">
				<div className=" flex flex-col justify-around items-center h-full px-3 gap-3 overflow-y-auto bg-zinc-700">
					<ul className="space-y-2 flex flex-col gap-7 mt-2 ">
						<div className='flex flex-col gap-6 md:bg-zinc-700 md:rounded-full md:p-4 lg:rounded-full lg:bg-neutral-800 md:border-2 md:border-neutral-800 lg:p-4 '>

							<NavLink to='/'><li className='inline-flex gap-3 items-center hover:scale-125' >
								<AiFillHome color="slateblue" className="h-8 w-8 " />
								<span className=' md:hidden lg:hidden'> HOME</span>
							</li></NavLink>

							<NavLink to='/categories'><li className='inline-flex gap-3 items-center hover:scale-125'>
								<RiFolderMusicFill color="slateblue" className="h-8 w-8 " />
								<span className=' md:hidden lg:hidden'>CATEGORIES</span>
							</li></NavLink>

							<NavLink to='/radio'><li className='inline-flex gap-3 items-center hover:scale-125'>
								<BiRadio color="slateblue" className="h-8 w-8 " />
								<span className=' md:hidden lg:hidden'>RADIO</span>
							</li></NavLink>

							<NavLink to='/video'><li className='inline-flex gap-3 items-center hover:scale-125'>
								<FaPhotoVideo color="slateblue" className="h-8 w-8 " />
								<span className=' md:hidden lg:hidden'>VIDEO</span>
							</li ></NavLink>

						</div>
						<div className='flex flex-col gap-6 md:bg-zinc-700 md:rounded-full md:p-4  lg:rounded-full lg:bg-neutral-800 md:border-2 md:border-neutral-800 lg:p-4 '>
							<li className='inline-flex gap-3 items-center hover:scale-125 '>
								<AiOutlineUser color="slateblue" className="h-8 w-8 " />
								<span className=' md:hidden lg:hidden'>SIGN IN</span>
							</li>
							<li className='inline-flex gap-3 items-center hover:scale-125'>
								<FiLogOut color="slateblue" className="h-8 w-8  " />
								<span className=' md:hidden lg:hidden'>SIGN OUT</span>
							</li>
						</div>
					</ul>
					<div className="flex justify-end items-center sm:flex-row md:flex-col lg:flex-col gap-3 ">
						<Avatar
							img={flagSpain}
							rounded={true}
						/>
						<Avatar
							img={flagEngland}
							rounded={true}
						/>
						<Avatar
							img={flagFrance}
							rounded={true}
						/>
					</div>

				</div>
			</aside>

		</>






	)
};

