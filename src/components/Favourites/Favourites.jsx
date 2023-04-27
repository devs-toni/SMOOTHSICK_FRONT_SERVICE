import { useAuthContext } from '../../context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { FavouritesSongCard } from '../FavouritesSongCard/FavouritesSongCard';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs'
import { useLanguage } from '../../context/LanguageContext';



export const Favourites = () => {
  const { dataState } = useGlobalContext();
  const { authState } = useAuthContext();
  const { text } = useLanguage();
  const [totalTracks, setTotalTracks] = useState([])
  
  useEffect(() => {
    setTotalTracks(dataState.tracks);
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
            <p className="w-2/12">{text.liked.track}</p>
            <p className="w-2/12"></p>
            <p className="w-3/12">Options</p>
            <p className="w-2/12">{text.liked.album_table}</p>
            <p className="w-2/12">{text.liked.gender}</p>
            <p className="w-1/12"><BsClock /></p>


          </div>
        </div>
        
        {
          dataState.tracks.map(({ id, name, artist, url, thumbnail, genre }, index) => {
            
            return (
              <FavouritesSongCard
                key={uuidv4()}
                id={id}
                count={index}
                name={name}
                artist={artist}
                url={url}
                thumbnail={thumbnail}
                genre={genre}
                isLike={true}
              />
            )
          })
        }
      </div>
    </div>
  )

};