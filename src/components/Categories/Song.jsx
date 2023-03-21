import { FaHeart } from "react-icons/fa"
import { SlOptionsVertical } from "react-icons/sl";

const Song = ({ id, name, artist, url, thumbnail, genre, isLike }) => {
  return (
    <div className='flex py-2 rounded-xl md:min-w-400 lg:min-w-400 xl:min-w-400'>

      <div className='w-1/6 mr-5'>
        <img src={thumbnail} alt={name} className="w-full" />
      </div>

      <div className='flex flex-row justify-between w-full grow text-left'>
        <div className="">
          <p className='text-sm sm:text-xl pr-4'>{name}</p>
          <p className='text-xs sm:text-md mt-1 text-gray-500'>{artist}</p>
        </div>

        <div className={`${isLike ? "border-red-500" : "border-gray-400"} flex sm:mr-5 text-xs md:text-2xl rounded-full my-auto cursor-pointer`}>
          <FaHeart className={`${isLike ? "text-green-400" : "text-gray-600"} mr-4`} />
          <SlOptionsVertical className="text-gray-600" />
        </div>
      </div>

    </div>
  )
}

export default Song