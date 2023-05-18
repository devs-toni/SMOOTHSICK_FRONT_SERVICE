import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../../context/LanguageContext'

export const MenuCategories = () => {
    const { text } = useLanguage();

    return (
        <div className='border-b border-line-section w-full'>
            <div className='flex justify-left gap-10 items-center text-xs md:text-lg'>
                <NavLink to="playlists" className={({ isActive }) => (isActive ? "border-b border-deezer " : "text-gray-400 hover:text-white hover:border-b border-white transition duration-1000 ease-in-out ")}>
                    {text.filters.playlists}
                </NavLink>
                <NavLink to="upload" className={({ isActive }) => (isActive ? "border-b border-deezer " : "text-gray-400 hover:text-white hover:border-b border-white transition duration-1000 ease-in-out")}>
                    {text.navbar.mysongs}
                </NavLink>
                <NavLink to="favourites" className={({ isActive }) => (isActive ? "border-b border-deezer " : "text-gray-400 hover:text-white hover:border-b border-white transition duration-1000 ease-in-out")}>
                    {text.liked.name}
                </NavLink>
            </div>
        </div>
    )
}
