import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES, PLAYLIST } from '../../../router/paths'
import { useUser } from '../../../context/UserContext'
import axios from 'axios'

const ListCard = ({ id, title }) => {
    const { userState, checktUserPlaylistsTracks } = useUser();
    const { userPlaylist } = userState

    const handleGetTracks = () => {
        const currentPlaylist = userPlaylist.find(playlist => playlist._id === id)
        checktUserPlaylistsTracks(currentPlaylist)
        console.log(currentPlaylist);
    }

    return (
        <Link to={`${CATEGORIES}${PLAYLIST}/${id}`}
            className="w-24 h-24 md:w-36 md:h-36 lg:h-60 lg:w-60 text-xs md:text-lg truncate rounded-lg flex flex-row items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200"
            onClick={handleGetTracks}
        >
            <span>{title}</span>
        </Link>
    )
}

export default ListCard