
import { FILTER_TYPES } from '../../Search/filterTypes';
import { v4 as uuidv4 } from 'uuid';
import './ComunityPlaylists.css';
import { useLanguage } from "../../../context/LanguageContext";
import { useFetchLessHomePlaylists } from "../../../hooks";
import BoxCard from '../../partials/BoxCard/BoxCard';
import { useAuth } from '../../../context/AuthContext';

export const ComunityPlaylists = () => {

  const { lessPlaylists, lessPlaylistsLoaded } = useFetchLessHomePlaylists();
  const { text } = useLanguage();
  const { authState } = useAuth();

  return (
    <div className='flex justify-center w-full'>
      <div className="sm:w-full flex flex-col items-center justify-center overflow-hidden z-10">
        <div className=" md:w-full mt-14 md:mt-0 ">

          {
            lessPlaylistsLoaded &&
            <>
              <div className={`w-full ${authState.isAuthenticated ? " border-t border-line-section" : ""}`}>
                <h1 className=' text-left text-xl md:text-2xl lg:text-4xl py-6 lg:py-11'>{text.charts.com_playlists}</h1>
              </div>
              <div className='grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2 md:gap-4 pb-14'>
                {
                  lessPlaylists.map(obj => {
                    console.log(obj);
                    return (
                      <BoxCard
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
    </div>
  )
}