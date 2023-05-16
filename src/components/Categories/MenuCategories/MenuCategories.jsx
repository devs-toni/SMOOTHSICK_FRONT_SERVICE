import { NavLink, useParams } from 'react-router-dom'
import { FAVOURITES, MYSONGS, PLAYLIST } from '../../../router/paths'
import { useLanguage } from '../../../context/LanguageContext'
export const MenuCategories = () => {
    const { text } = useLanguage();

    return (
        <div className='border-b border-line-section w-full'>
            <div className='flex justify-left gap-10 items-center text-xs md:text-lg'>
                <NavLink to="playlist" className={({ isActive }) => (isActive ? "border-b border-deezer " : "text-gray-400 hover:text-white hover:border-b border-white")}>
                    {text.filters.playlists}
                </NavLink>
                <NavLink to="upload" className={({ isActive }) => (isActive ? "border-b border-deezer " : "text-gray-400 hover:text-white hover:border-b border-white")}>
                    {text.navbar.mysongs}
                </NavLink>
                <NavLink to="favourites" className={({ isActive }) => (isActive ? "border-b border-deezer " : "text-gray-400 hover:text-white hover:border-b border-white")}>
                    {text.liked.name}
                </NavLink>
            </div>
        </div>
    )
}
