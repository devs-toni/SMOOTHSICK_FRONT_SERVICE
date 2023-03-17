import { Avatar } from 'flowbite-react';
import { FaPhotoVideo } from "react-icons/fa";
import { AiFillHome, AiOutlineUser } from "react-icons/ai"
import { RiFolderMusicFill, RiMenu4Fill } from "react-icons/ri"
import { BiRadio } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import flagSpain from '../../assets/imgs/flags/spain.png'
import flagEngland from '../../assets/imgs/flags/united-kingdom.png'
import flagFrance from '../../assets/imgs/flags/france.png'
import { useLanguage } from '../../context/LanguageContext';
import { useRef, useState } from 'react';
import exampleLogo from '../../assets/imgs/logo/logo-head.svg';
import { Toaster, toast } from "react-hot-toast";



export const NavBar = () => {

	const [currentCountryImg, setCurrentCountryImg] = useState(flagSpain)
	const [currentCountryName, setCurrentCountryName] = useState("spain")

	const [otherCountryImg1, setOtherCountryImg1] = useState(flagEngland)
	const [otherCountryName1, setOtherCountryName1] = useState("united-kingdom")

	const [otherCountryImg2, setOtherCountryImg2] = useState(flagFrance)
	const [otherCountryName2, setOtherCountryName2] = useState("france")


	const currentRef = useRef()
	const dropDown = useRef()

	const { logout, authState } = useAuthContext()


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


	const handleSwitchImg = ({ target }) => {
		const { name, dataset, src } = target
		const { position } = dataset

		if (position === "1") {
			setOtherCountryImg1(currentRef.current.src)
			setOtherCountryName1(currentRef.current.name)
			setCurrentCountryName(name)
			setCurrentCountryImg(src)
		} else {
			setOtherCountryImg2(currentRef.current.src)
			setOtherCountryName2(currentRef.current.name)
			setCurrentCountryName(name)
			setCurrentCountryImg(src)
		}
	}





	const { text } = useLanguage()

	const isInPage = "opacity-40"
	const isNotInPage = ""



	return (

		<>
			<Toaster />
			<nav className="fixed top-0 z-50 w-full bg-zinc-700 ">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start">
							<img className='h-12 w-16' src={exampleLogo} alt="" />
							<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 bg-neutral-800 rounded-lg md:hidden ml-6 focus:outline-none">
								<RiMenu4Fill className='h-6 w-6' />
							</button>
						</div>
						<label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>

						<form className="flex items-center md:pl-1  lg:pl-1">
							<div className="relative w-full">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
								</div>
								<input type="text" id="simple-search" className=" border bg-neutral-800 border-gray-300 text-white text-sm rounded-lg block w-full pl-10 p-2.5 " placeholder={text.navbar.input_p_holder} required />
							</div>
						</form>


						<div className="flex items-center">
							<div className="flex items-center ml-3">
								<div>
									<div className="flex justify-center items-center flex-wrap">
										<Avatar
											img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											rounded={true}
											className="pr-3"
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

							<NavLink to='/'
								className={({ isActive }) => (
									isActive ? isInPage : isNotInPage
								)}>
								<li className='inline-flex gap-3 items-center hover:scale-125' >
									<AiFillHome color="slateblue" className="h-8 w-8 " />
									<span className=' md:hidden lg:hidden'>{text.navbar.home}</span>
								</li></NavLink>
							<NavLink to='/categories'
								className={({ isActive }) => (
									isActive ? isInPage : isNotInPage
								)}>
								<li className='inline-flex gap-3 items-center hover:scale-125'>

									<RiFolderMusicFill color="slateblue" className="h-8 w-8 " />
									<span className=' md:hidden lg:hidden'>{text.navbar.categories}</span>
								</li></NavLink>
							<NavLink to='/radio'
								className={({ isActive }) => (
									isActive ? isInPage : isNotInPage
								)}>
								<li className='inline-flex gap-3 items-center hover:scale-125'>
									<BiRadio color="slateblue" className="h-8 w-8 " />
									<span className=' md:hidden lg:hidden' >{text.navbar.radio}</span>
								</li></NavLink>

							<NavLink to='/video'
								className={({ isActive }) => (
									isActive ? isInPage : isNotInPage
								)}>
								<li className='inline-flex gap-3 items-center hover:scale-125'>
									<FaPhotoVideo color="slateblue" className="h-8 w-8 " />
									<span className=' md:hidden lg:hidden'> {text.navbar.video}</span>
								</li ></NavLink>

						</div>

						<div className='flex flex-col gap-6 md:bg-zinc-700 md:rounded-full md:p-4 lg:rounded-full lg:bg-neutral-800 md:border-2 md:border-neutral-800 lg:p-4 '>
							{
								!authState.isAuthenticated ?
									<NavLink to="/login"
										className={({ isActive }) => (
											isActive ? isInPage : isNotInPage
										)}>
										<li className='inline-flex gap-3 items-center hover:scale-125 '>
											<AiOutlineUser color="slateblue" className="h-8 w-8 " />
											<span className=' md:hidden lg:hidden' > {text.navbar.login}</span>
										</li></NavLink>
									:
									<li className='inline-flex gap-3 items-center hover:scale-125' onClick={handleLogout}>
										<FiLogOut color="slateblue" className="h-8 w-8 " />
										<span className=' md:hidden lg:hidden' > {text.navbar.logout}</span>
									</li>
							}

						</div>
					</ul>

					<img src={currentCountryImg} ref={currentRef} alt={currentCountryName} id="dropdownRightBotton" data-dropdown-toggle="dropdownBottom" data-dropdown-placement="bottom" className="h-16 hover:scale-110 rounded-full text-sm px-4 py-2.5 md:h-14 lg:h-12 " />

					<div id="dropdownBottom" ref={dropDown} className="z-10 hidden">
						<ul className=" text-sm text-gray-700 flex items-center flex-col gap-3">
							<li>
								<img name={otherCountryName1} src={otherCountryImg1} alt={`${otherCountryName1} flag`} className='h-8' data-position="1" onClick={handleSwitchImg} />
							</li>
							<li>
								<img name={otherCountryName2} src={otherCountryImg2} alt={`${otherCountryName2} flag`} className='h-8' data-position="2" onClick={handleSwitchImg} />
							</li>
						</ul>
					</div>
				</div>
			</aside>

		</>






	)
};

