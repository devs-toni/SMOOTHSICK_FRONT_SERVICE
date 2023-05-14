import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import { CATEGORIES, PLAYLIST } from '../../../router/paths'

const ListCard = ({id, title}) => {
    return (
        <Link to={`${CATEGORIES}${PLAYLIST}/${id}`}
            className=" h-60 w-60 rounded-lg flex flex-row items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200"
        >
            <span>{title}</span>
        </Link>
    )
}

export default ListCard