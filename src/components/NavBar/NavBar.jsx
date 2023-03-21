import { Avatar } from 'flowbite-react';
import { FaPhotoVideo, FaUserShield, FaUserPlus } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai"
import { RiFolderMusicFill, RiMenu4Fill } from "react-icons/ri"
import { BiRadio } from "react-icons/bi"
import { FiLogOut } from "react-icons/fi"
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import flagSpain from '../../assets/imgs/flags/spain.png'
import flagEngland from '../../assets/imgs/flags/united-kingdom.png'
import flagFrance from '../../assets/imgs/flags/france.png'
import flagChina from '../../assets/imgs/flags/china.png'
import exampleLogo from '../../assets/imgs/logo/logo-head.svg';
import defaultUserPicture from "../../assets/imgs/default_pictures/default_user_img.png"
import { SIGNUP, LOGIN } from '../../router/paths'


export const NavBar = () => {

	console.log("0");
	
	const { logout, authState } = useAuthContext();
	const { handleLanguage, text } = useLanguage();

	const [toggleBar, setToggleBar] = useState(false)

	const location = useLocation()


	useEffect(() => {
		if (location.pathname == `/${LOGIN}` || location.pathname == `/${SIGNUP}`) {
			setToggleBar(false)
		} else {
			setToggleBar(true)
		}

	}, [location])


	const { user } = authState


	const lenguageSelected = [
		{ key: 1, name: "spain", country: flagSpain },
		{ key: 2, name: "france", country: flagEngland },
		{ key: 3, name: "united-kingdom", country: flagFrance },
		{ key: 4, name: "china", country: flagChina }
	];


	const asideLinks = [
		{ key: 1, path: "/", icon: <AiFillHome color="rgb(131 24 67)" className="h-6 w-6 " />, text: text.navbar.home },
		{ key: 2, path: "/categories", icon: <RiFolderMusicFill color="rgb(131 24 67)" className="h-6 w-6 " />, text: text.navbar.categories },
		{ key: 3, path: "/radio", icon: <BiRadio color="rgb(131 24 67)" className="h-6 w-6 " />, text: text.navbar.radio },
		{ key: 4, path: "/video", icon: <FaPhotoVideo color="rgb(131 24 67)" className="h-6 w-6 " />, text: text.navbar.video }
	]


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
		{console.log("3")}
			<Toaster />
			<div className="fixed top-0 z-50 w-full rounded-b-lg shadow-lg shadow-cyan-500/50 bg-primary-color md:bg-transparent md:shadow-none">
				<nav className="flex flex-row items-center justify-between p-3 md:p-3 pr-4 pl-4 pt-3 md:pr-8 md:pl-11 lg:pr-5 lg:pl-5 " >
					<img className='h-12 w-14' src={exampleLogo} alt="" />
					<button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 bg-neutral-800 rounded-lg md:hidden focus:outline-none">
						<RiMenu4Fill className='h-6 w-6' />
					</button>


					<div className={toggleBar === true ? "relative" : "hidden"} >
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
						</div>
						<input type="text" id="search" className=" border bg-box-icons border-gray-300 text-white text-sm rounded-lg block pl-10 p-2.5 " placeholder={text.navbar.input_p_holder} required />
					</div>



					<div className="flex justify-center items-center flex-wrap">
						<div>
							{
								authState.isAuthenticated
									?
									<>
										<Avatar
											img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
											rounded={true}
											id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots"
										/>
										<div id="dropdownDots" className="z-10 hidden bg-zinc-700 divide-y divide-gray-100 rounded-lg shadow w-44">
											<ul className="py-2 text-sm text-white  dark:text-gray-200" aria-labelledby="dropdownMenuIconButton" >
												<NavLink to='/account' className={({ isActive }) => (isActive ? "opacity-40" : "")}>
													<li className=' block px-4 py-2 hover:bg-gray-100'>
														<span>{text.navbar.dashboard}</span>
													</li>
												</NavLink>
												<div className="py-2 flex flex-row justify-evenly">
													{
														lenguageSelected.map((item) => (
															<img
																key={item.key}
																src={item.country}
																alt={item.name + " flag"}
																name={item.name}
																className="h-6 cursor-pointer hover:scale-125"
																onClick={handleApplyLenguage}
															/>
														))
													}
												</div>
											</ul>
											<li className='block px-4 py-2 cursor-pointer hover:underline decoration-2' onClick={handleLogout}>
												<span> {text.navbar.logout}</span>
											</li>
										</div>
									</>
									:
									<>
										<Avatar
											img={defaultUserPicture}
											rounded={true}
											id="dropdownMenuIconButton2" data-dropdown-toggle="dropdownDots2"
										/>
										<div id="dropdownDots2" className="z-10 hidden bg-zinc-700 divide-y divide-gray-100 rounded-lg shadow w-44">
											<ul className="py-2 text-sm text-white  dark:text-gray-200" aria-labelledby="dropdownMenuIconButton" >
												<NavLink to='/login'>
													<li className=' block px-4 py-2 hover:bg-gray-100'>
														<span>{text.navbar.login}</span>
													</li>
												</NavLink>
												<div className="py-2 flex flex-row justify-evenly">
													{
														lenguageSelected.map((item) => (
															<img
																key={item.key}
																src={item.country}
																alt={item.name + " flag"}
																name={item.name}
																className="h-6 cursor-pointer hover:scale-125"
																onClick={handleApplyLenguage}
															/>
														))
													}
												</div>
											</ul>
										</div>
									</>
							}
						</div>
					</div>
				</nav>
			</div>

			<aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-30 bg-zinc-700 md:bg-transparent h-screen transition-transform -translate-x-full md:translate-x-0 md:w-36 lg:w-24 max-h-100 min-h-max" aria-label="Sidebar">
				<div className="flex flex-col justify-around items-center h-full px-3 gap-3 overflow-y-auto">
					<ul className="space-y-2 flex flex-col gap-7 mt-2 ">
						<div className='flex flex-col gap-6 bg-box-icons md:rounded-full md:p-4 lg:rounded-full lg:p-4 '>

							{
								asideLinks.map((item) => (
									<NavLink key={item.key} to={item.path} className={({ isActive }) => (isActive ? "opacity-40" : "")}>
										<li className='inline-flex gap-3 items-center hover:scale-110'>
											{item.icon}
											<span className=' md:hidden lg:hidden'>{item.text}</span>
										</li>
									</NavLink>
								))
							}
						</div>

						<div className='flex flex-col gap-6 md:rounded-full md:p-4 lg:rounded-full bg-box-icons lg:p-4 '>
							{
								!authState.isAuthenticated
									?
									<>
										<NavLink to="/login" className={({ isActive }) => (isActive ? "opacity-40" : "")}>
											<li className='inline-flex gap-3 items-center hover:scale-110 '>
												<FaUserShield color="rgb(131 24 67)" className="h-6 w-6 " />
												<span className=' md:hidden lg:hidden' > {text.navbar.login}</span>
											</li>
										</NavLink>

										<NavLink to="/signup" className={({ isActive }) => (isActive ? "opacity-40" : "")}>
											<li className='inline-flex gap-3 items-center hover:scale-110 '>
												<FaUserPlus color="rgb(131 24 67)" className="h-6 w-6 " />
												<span className=' md:hidden lg:hidden' > {text.navbar.register}</span>
											</li>
										</NavLink>
									</>
									:
									<li className='inline-flex gap-3 items-center hover:scale-125 cursor-pointer' onClick={handleLogout}>
										<FiLogOut color="rgb(131 24 67)" className="h-6 w-6" />
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

