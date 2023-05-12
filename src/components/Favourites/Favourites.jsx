import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs'
import { useUser } from '../../context/UserContext';
import { DetailsCard } from '../index';
import { v4 as uuidv4 } from 'uuid';



export const Favourites = () => {
  const { userState, getFavourites } = useUser();
  const { favourites } = userState;
  const { authState } = useAuth();
  const { user } = authState
  const { text } = useLanguage();
  const [totalTracks, setTotalTracks] = useState("");



  useEffect(() => {
    if (favourites.length > 0) {
      setTotalTracks(favourites.length)
    }
    getFavourites();
  }, [favourites.length])



  return (
    <div className="flex w-full items-center justify-center pb-24">
      <div className='w-[80%] h-full p-6 md:ml-20 lg:ml-52 mt-14 md:mt-20'>
        <h3 className='text-xl text-center font-medium lg:text-4xl lg:mb-3'>{text.liked.title}</h3>
        <div className='flex items-center my-2 lg:mb-5'>
          <img src={user.profilePicture} alt="User" className='user-profile-img mr-2 rounded-full w-full' width="" height="" />
          <span className='mr-3 text-xs capitalize font-bold'>{user.firstName}</span>
          <span className='text-gray-500 my-2 text-xs'>{totalTracks} {text.liked.total}</span>
        </div>
        <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%]">
          <div className='flex items-center justify-between border-b border-b-gray-300'>
            <p className="w-1/12">#</p>
            <p className="w-2/12">{text.liked.track}</p>
            <p className="w-2/12"></p>
            <p className="w-3/12">Options</p>
            <p className="w-3/12">{text.liked.album_table}</p>
            <p className="w-2/12">{text.liked.gender}</p>
            <BsClock className='w-2/12 ' />
          </div>
        </div>
        {
          favourites.length > 0 && favourites.map((track, index) => {
            return (
              <DetailsCard
                key={uuidv4()}
                track={track}
                count={index}
                tracks={favourites}
              />
            )
          })
        }
      </div>
    </div>
  )

};