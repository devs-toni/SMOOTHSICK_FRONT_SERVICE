import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs'
import { useUser } from '../../context/UserContext';
import { DetailsCard } from '../index';
import { v4 as uuidv4 } from 'uuid';
import { Avatar, Button } from 'flowbite-react';
import { FaRandom } from 'react-icons/fa';



export const Favourites = () => {
  const { userState, getFavourites } = useUser();
  const { favourites } = userState;
  const { authState } = useAuth();
  const { text } = useLanguage();
  const [totalTracks, setTotalTracks] = useState("");



  useEffect(() => {
    if (favourites.length > 0) {
      setTotalTracks(favourites.length)
    }
    getFavourites();
  }, [favourites.length])



  return (
    <>
      <h3 className='text-left text-4xl py-6'>{text.liked.title}</h3>
      <div className="flex w-full flex-col justify-center pb-24">
        <div className='flex items-center text-center justify-between border-b border-line-section'>
          <p className="hidden md:block w-1/12">#</p>
          <p className="w-2/12">{text.liked.track}</p>
          <p className="w-2/12"></p>
          <p className="w-2/12 md:w-3/12">Options</p>
          <p className="hidden md:block md:w-3/12">{text.album.album_name}</p>
          <p className="hidden lg:block lg:w-2/12">{text.liked.gender}</p>
          <BsClock className='w-3/12 md:w-2/12' />
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
    </>
  )

};