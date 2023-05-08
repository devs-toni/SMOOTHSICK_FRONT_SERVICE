import { Button, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';


export const ChangePassword = () => {
	const { text } = useLanguage()
  const { authState } = useAuth()
	const [eyeClicked, setEyeClicked] = useState(false);


	useEffect(() => {
		if (eyeClicked) {
			setTimeout(() => {
				setEyeClicked(false)
			}, 3000);
		}

	}, [eyeClicked])

	const styleInput = {
		backgroundColor: "#00000000"
	};
	return (
		<div className='w-full h-5/6 items-center flex flex-col justify-center'>
			<div className="headphones-image"></div>
			<p className="text-lg md:text-4xl font-semibold mb-12">{text.changepass.title}</p>
			<form className=' flex item-cente justr flex-col gap-4 max-w-xl w-full px-10 pt-10 m-4 rounded-md register image-z'>
				<div className='flex flex-col relative'>
					<span className='text-white'> {text.changepass.current_pass}</span>
					<TextInput
						type={eyeClicked ? "text" : "password"}
						color="white"
						style={styleInput}
						className=" border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"

						defaultValue={authState.user.firstName}
					/>
					<FaEye className="absolute right-2 top-9 opacity-60 hover:opacity-100 cursor-pointer" onClick={() => setEyeClicked(!eyeClicked)} />
				</div>
				<div className='text-white flex flex-col'>
					<span>{text.changepass.new_pass}</span>
					<TextInput
						style={styleInput}
						color="white"
						type="password"
						className=" border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
					/>
				</div>
				<div className='flex flex-col'>
					<span className='text-white'>{text.changepass.r_new_pass}</span>
					<TextInput
						style={styleInput}
						color="white"
						type="password"
						className=" border border-t-transparent border-l-transparent border-r-transparent bg-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500"
					/>
				</div>
				<Button
					className="text-xs md:text-sm bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition duration-500 ease-in-out transform text-white font-bold"
					type="submit"
				>
					{text.changepass.btn_save_pass}
				</Button>
			</form>
		</div>

	)
};

