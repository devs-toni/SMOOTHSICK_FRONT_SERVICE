import { useLanguage } from '../../context/LanguageContext';
import { useEffect, useState } from 'react';
import { BsClock } from 'react-icons/bs'
import { useUser } from '../../context/UserContext';
import { DetailsCard } from '../index';
import { v4 as uuidv4 } from 'uuid';



export const Favourites = () => {
  const { userState, getFavourites } = useUser();
  const { favourites } = userState;
  const { text } = useLanguage();



  return (
    <>
      <h3 className='text-left text-xl md:text-2xl lg:text-4xl md:py-4 lg:py-6 lg:text-left'>{text.liked.title}</h3>
      <div className="flex w-full flex-col justify-center pb-24">
        <div className='flex items-center text-center justify-between border-b border-line-section'>
          <p className="hidden md:block w-1/12">#</p>
          <p className="w-2/12">{text.liked.track}</p>
          <p className="w-2/12"></p>
          <p className="w-2/12 md:w-3/12">Options</p>
          <p className="hidden md:block md:w-3/12">{text.categories.artist}</p>
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