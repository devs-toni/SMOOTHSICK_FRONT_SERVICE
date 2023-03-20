import React from 'react'


const Accountsettings = () => {
    return (
        <>

            <div className="flex items-center flex-col pt-20 gap-7 flex-wrap">
                <div className='flex flex-row justify-around border border-whiteflex w-screen h-80'>
                    <div>
                        <span>Account Settings</span>
                        <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Prueba</button>

                    </div>
                    <div className='flex flex-col'>
                        <h1>User</h1>
                        <span>Contact</span>
                        <span>Billing Adress</span>
                    </div>
                    <div className='flex flex-col'>
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Change password </a><br></br>
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Change direction </a><br></br>
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Change mobile phone </a><br></br>
                        <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Payment information </a><br></br>
                        
                    </div>
                </div>

            </div>
            <div className='flex flex-row justify-around border border-whiteflex w-screen h-40'>
                <div>
                    <p>Plant Details</p>
                </div>
                <div><p>Type Suscription</p></div>
                <div><a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Change the plan</a></div>
            </div>
            <div className='flex flex-row justify-around border border-whiteflex w-screen h-50'>
                <div><p>Security and Privacy</p></div>
                <div><p>Security Options</p></div>
                <div><a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Security options </a></div>
            </div>
            <div>
                asdasdasd
            </div>
            <div>
                f234radasd
            </div>
            <div>
                aq34qasdad
            </div>




        </>

    )
}

export default Accountsettings