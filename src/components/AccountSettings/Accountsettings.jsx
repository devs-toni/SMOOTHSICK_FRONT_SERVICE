import React, { useContext, useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useLanguage } from '../../context/LanguageContext'


const Accountsettings = () => {
    const { text } = useLanguage()
    const { authState } = useAuthContext()


    return (



        <div className="flex justify-around items-center flex-col pt-56 gap-7 max-w-5xl	m-auto mt-10 p-10 md:max-w-xl lg:max-w-3xl xl:max-w-6xl ">
            <div className='grid grid-cols-3 justify-start items-start py-4 gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500  w-full'>
                <div className='flex flex-col'>
                    {console.log(authState)}
                    <span> {text.account.account} </span>
                    <button type="button" className="text-white h-16 w-32 bg-gradient-to-r from-purple-500 to-pink-500  hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cancel Subscription</button>
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
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{text.account.password}</a><br></br>
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">{text.account.edit} </a><br></br>

                </div>
            </div>

            <div className='grid grid-cols-3 justify-start items-center gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500 w-full h-40'>
                <div>
                    <p>{text.account.plan}</p><br></br>
                </div>
                <div><p>{text.account.subscription} </p><br></br></div>
                <div><a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Change the plan</a></div>
            </div>
            <div className='grid grid-cols-3 justify-start items-center pb-6 gap-7 border border-t-transparent border-l-transparent border-r-transparent focus:border-transparent focus:ring-0 border-b-1 border-neutral-500 w-full h-1/3'>
                <div className=""><p>Security and Privacy</p></div>
                <div><p>Security Options</p></div>
                <div><a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Security options </a></div>
            </div>

        </div>





    )
}

export default Accountsettings