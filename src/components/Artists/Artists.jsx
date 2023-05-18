import { useLanguage } from "../../context/LanguageContext";
import BoxCard from "../partials/BoxCard/BoxCard";
import { FILTER_TYPES } from '../Search/filterTypes';
import { v4 as uuidv4 } from 'uuid';
import './Artists.css';
import { useFetchAllArtists } from "../../hooks";

export const Artists = () => {

  const { artists, artistsLoaded } = useFetchAllArtists();
  const { text } = useLanguage();

  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        <div className='w-80 md:w-full md:px-16 mt-14 md:mt-0'>
          {
            artistsLoaded &&
            <>

              <h1 className='artists__title text-4xl mb-6 ml-2'>{text.filters.artists}</h1>
              <div className='grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 pb-14'>
                {
                  artists.map(obj => {
                    return (
                      <BoxCard
                        key={uuidv4()}
                        obj={obj}
                        targetClass="artists"
                        type={FILTER_TYPES.ARTISTS}
                      />
                    )
                  })
                }
              </div>
            </>
          }
        </div>
      </div>
      <div className="headphones-image"></div>
    </div>
  )
}