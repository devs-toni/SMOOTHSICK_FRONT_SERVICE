import { useGlobalContext } from '../../context/GlobalContext';
import { useLanguage } from '../../context/LanguageContext';
import Song from '../Categories/Song';
import { v4 as uuidv4 } from 'uuid';


export const Radio = () => {

  const { dataState } = useGlobalContext();
  const { text } = useLanguage();

  return (
    <div className="flex items-center justify-center h-full">
      <div className='mt-20 w-full m-auto p-6'>
        <h3 className='text-xl font-medium text-left'>{text.liked.title}</h3>
        <p className='text-gray-500 my-2 text-xs'>49 {text.liked.total}</p>
        {
          dataState.tracks.map(({ id, name, artist, url, thumbnail, genre }) => {
            return (
              <Song
                key={uuidv4()}
                id={id}
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

