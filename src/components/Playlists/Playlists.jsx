import { useLanguage } from "../../context/LanguageContext";
import BoxSongCard from "../BoxSongCard/BoxSongCard";
import { FILTER_TYPES } from '../Search/filterTypes';
import { v4 as uuidv4 } from 'uuid';
import './Playlists.css';
import { useFetchLessHomePlaylists } from "../../hooks";

export const Playlists = () => {

  const { lessPlaylists, lessPlaylistsLoaded } = useFetchLessHomePlaylists();
  const { text } = useLanguage();

  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        <div className='max-w-81rem'>
          {
            lessPlaylistsLoaded &&
            <>
              <h1 className='playlists__title'>{text.filters.less_playlists}</h1>
              <div className='playlists__section'>
                {
                  lessPlaylists.map(obj => {
                    return (
                      <BoxSongCard
                        key={uuidv4()}
                        obj={obj}
                        targetClass="playlists"
                        type={FILTER_TYPES.PLAYLISTS}
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