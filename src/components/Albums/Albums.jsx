import { useLanguage } from "../../context/LanguageContext";
import { useFetchAllAlbums } from "../../hooks";
import BoxCard from "../partials/BoxCard/BoxCard";
import { FILTER_TYPES } from '../Search/filterTypes';
import { v4 as uuidv4 } from 'uuid';
import './Albums.css';

export const Albums = () => {

  const { albums, albumsLoaded } = useFetchAllAlbums();
  const { text } = useLanguage();
  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        <div className='w-80 md:w-full md:px-16 mt-14 md:mt-0'>
          {
            albumsLoaded &&
            <>
              <h1 className='albums__title text-4xl mb-6 ml-2'>{text.filters.albums}</h1>
              {/* <div className='albums__section'> */}
              {<div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 pb-14">
                {
                  albums.map(obj => {
                    return (
                      <BoxCard
                        key={uuidv4()}
                        obj={obj}
                        targetClass="albums"
                        type={FILTER_TYPES.ALBUMS}
                      />
                    )
                  })
                }
              </div>}
              {/* </div> */}
            </>
          }
        </div>
      </div>
      <div className="headphones-image"></div>
    </div>
  )
}