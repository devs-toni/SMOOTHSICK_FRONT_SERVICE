import { useLanguage } from "../../context/LanguageContext";
import HomeSongCard from "../HomeSongCard/HomeSongCard";
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
        <div className='max-w-81rem'>
          {
            artistsLoaded &&
            <>
              <h1 className='artists__title'>{text.filters.artists}</h1>
              <div className='artists__section'>
                {
                  artists.map(obj => {
                    return (
                      <HomeSongCard
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