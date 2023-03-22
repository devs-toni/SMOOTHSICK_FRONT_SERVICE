import { FaHeart } from 'react-icons/fa'

const Chart = ({ img, title, artist, isLike }) => {

  return (
    <div className='flex mt-4 bg-chart p-5 rounded-md md:min-w-400 lg:min-w-400 box-shadow xl:min-w-400'>

      <div className='w-1/3 mr-5 max-img'>
        <img src={img} alt={title} className="rounded-sm w-full max-img" />
      </div>

      <div className='flex flex-row justify-between w-full grow text-left'>
        <div className='text-xs'>
          <p className='sm:text-xl pr-4'>{title}</p>
          <p className='text-xs sm:text-md mt-2'>{artist}</p>
        </div>

        <div className={`${isLike ? "border-red-500" : "border-gray-400"} sm:mr-5 text-xs md:text-2xl rounded-full my-auto cursor-pointer`}>
          <FaHeart className={isLike ? "text-red-500" : "text-gray-600"} />
        </div>
      </div>

    </div>
  )
}

export default Chart;