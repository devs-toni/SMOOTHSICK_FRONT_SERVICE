import { useLanguage } from "../../context/LanguageContext";
import { useFetchAllAlbums } from "../../hooks";
import HomeSongCard from "../HomeSongCard/HomeSongCard";
import { FILTER_TYPES } from '../Search/filterTypes';
import { v4 as uuidv4 } from 'uuid';
import './Albums.css';

export const Albums = () => {

  const { albums, albumsLoaded } = useFetchAllAlbums();
  const { text } = useLanguage();

  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        <div className='max-w-81rem'>
          {
            albumsLoaded &&
            <>
              <h1 className='albums__title'>{text.filters.albums}</h1>
              <div className='albums__section'>
                {
                  albums.map(obj => {
                    return (
                      <HomeSongCard
                        key={uuidv4()}
                        obj={obj}
                        targetClass="albums"
                        type={FILTER_TYPES.ALBUMS}
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