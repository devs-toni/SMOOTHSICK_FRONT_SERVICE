import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Chart = ({ img, title, artist, isLike }) => {

  return (
    <div className='flex my-4 bg-chart p-3 rounded-xl'>
      <div className='w-1/3 mr-5'>
        <img src={img} alt={title} className="rounded-lg" />
      </div>
      <div className='flex flex-row justify-between items-center w-full'>
        <div className='text-xs'>
          <p>{title}</p>
          <p>{artist}</p>
        </div>
        <div className={`${isLike ? "border-red-500" : "border-gray-400"} mr-5 text-xs md:text-xl border p-3 rounded-full `}>
          <FaHeart className={isLike ? "text-red-500" : "text-gray-400"} />
        </div>
      </div>
    </div>
  )
}

export default Chart