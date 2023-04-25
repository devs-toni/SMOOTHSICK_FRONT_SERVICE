import { useGlobalContext, useAuthContext, useLanguage } from '../../index';
import { v4 as uuidv4 } from 'uuid';
import { FavouritesSongCard } from '../FavouritesSongCard/FavouritesSongCard';
import { useEffect, useState } from 'react';



export const Favourites = () => {
  const { dataState } = useGlobalContext();
  const { authState } = useAuthContext();
  const { text } = useLanguage();
  const [totalTracks, setTotalTracks] = useState([])
  
  useEffect(() => {
    setTotalTracks(dataState.tracks);
  }, [])



  return (
    <div className="flex items-center justify-center pb-24">
      <div className='w-full h-full m-auto p-6 md:max-w-2xl md:pl-20 lg:max-w-3xl mt-14 md:mt-20 min-w-[75%]'>
        <h3 className='text-xl text-center font-medium lg:text-4xl lg:mb-3'>{text.liked.title}</h3>
        <div className='flex items-center my-2 lg:mb-5'>
          <img src={authState.user.profilePicture} alt="User" className='user-profile-img mr-2 rounded-full w-full' width="" height="" />
          <p className='mr-3 text-xs capitalize font-bold'>{authState.user.firstName}</p>
          <p className='text-gray-500 my-2 text-xs'>{totalTracks.length} {text.liked.total}</p>
        </div>
        <div className='flex items-center my-2 lg:mb-5'>

        </div>
        <div className="z-10 flex flex-col h-34 text-center justify-center w-5/6 min-w-[100%] ">
          <div className='flex items-center justify-between border-b border-b-gray-300'>
            <p className="w-1/12">#</p>
            <p className="w-1/12">{text.liked.track}</p>
            <p className="w-2/12">{text.liked.title_table}</p>
            <p className="w-4/12">{text.liked.album_table}</p>
            <p className="w-2/12">{text.liked.gender}</p>
            <p className="w-2/12">{text.liked.options}</p>

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