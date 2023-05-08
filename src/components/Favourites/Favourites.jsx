import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs'
import { useUser } from '../../context/UserContext';
import { FavouritesSongCard } from '../index';
import { v4 as uuidv4 } from 'uuid';



export const Favourites = () => {
  const { authState } = useAuth();
  const { text } = useLanguage();
  const { userState, getFavourites } = useUser();
  const [totalTracks, setTotalTracks] = useState([]);

  useEffect(() => {
    getFavourites();
  }, [])
  
  return (
    <div className="flex w-full items-center justify-center pb-24">
      <div className='w-full h-full  p-6 md:max-w-2xl md:pl-20 lg:max-w-3xl mt-14 md:mt-20 min-w-[75%]'>
        <h3 className='text-xl text-center font-medium lg:text-4xl lg:mb-3'>{text.liked.title}</h3>
        <div className='flex items-center my-2 lg:mb-5'>
          <img src={authState.user.profilePicture} alt="User" className='user-profile-img mr-2 rounded-full w-full' width="" height="" />
          <p className='mr-3 text-xs capitalize font-bold'>{authState.user.firstName}</p>
          <p className='text-gray-500 my-2 text-xs'>{totalTracks.length} {text.liked.total}</p>
        </div>
        <div className='flex w-full items-center justify-center h-full'>

        </div>
        <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
          <div className='flex items-center justify-between border-b border-b-gray-300'>
            <p className="w-1/12">#</p>
            <p className="w-2/12">{text.liked.track}</p>
            <p className="w-2/12"></p>
            <p className="w-3/12">Options</p>
            <p className="w-3/12">{text.liked.album_table}</p>
            <p className="w-2/12">{text.liked.gender}</p>
            <p className="w-2/12"><BsClock className='w-11/12' /></p>
          </div>
        </div>
        {
          userState.favourites.length > 0 && userState.favourites.map((track, index) => {
            return (
              <FavouritesSongCard
                key={uuidv4()}
                track={track}
                count={index}
              />
            )
          })
        }
      </div>
    </div>
  )

};