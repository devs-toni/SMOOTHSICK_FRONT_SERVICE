import { FaHeart } from 'react-icons/fa'
import { SlOptions } from 'react-icons/sl'
import { GiMicrophone } from "react-icons/gi";
import { Link } from "react-router-dom";





export const FavouritesSongCard = ({ id, name, artist, url, thumbnail, genre, isLike, count }) => {



    return (
        <div className='flex w-full items-center justify-center h-full'>
            <div className='w-full md:max-w-2xl lg:max-w-3xl min-w-[100%] pt-2'>
                <div className='flex items-center rounded-xl bg-box-icons h-16'>
                  {/*   <span className='w-1/12 text-center'>{count + 1}</span> */}
                    <div className=' flex w-2/12 items-center justify-center'>
                        <img className="rounded-lg w-16 " src={thumbnail} alt="image description" width="60px" height="" />
                    </div>
                    <span className="text-xs text-center w-2/12 md:text-md grow">{name}</span>
                    <div className={`${isLike ? "border-red-500" : "border-gray-400"} w-3/12 flex items-center justify-center text-xs md:text-2xl rounded-full my-auto cursor-pointer `}>
                        <FaHeart className={`${isLike ? "text-green-400" : "text-gray-600"} mr-4`} />
                        <Link to="/">
              <GiMicrophone
                className={`${
                  isLike ? "text-white-400" : "text-gray-600"
                } mr-4`}
              />
            </Link>
                        <SlOptions className="text-withe-600" />
                    </div>
                    <p className="text-xs text-center font-normal w-3/12 md:text-md ">{artist}</p>
                    <span className="text-xs text-center w-2/12 md:text-md grow">{genre}</span>
                    <span className="text-xs text-center w-2/12 md:text-md grow">{genre}</span>

                </div>
            </div>
        </div>
    )
}
