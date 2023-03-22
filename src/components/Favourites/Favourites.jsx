import { useGlobalContext } from '../../context/GlobalContext';
import { useAuthContext } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Song from '../Categories/Song';
import { v4 as uuidv4 } from 'uuid';
import { FaClock } from 'react-icons/fa';


export const Favourites = () => {

  const { dataState } = useGlobalContext();
  const { authState } = useAuthContext();
  const { text } = useLanguage();

  return (
    <div className="flex items-center justify-center h-full">
      <div className='w-full m-auto p-6 md:max-w-2xl md:pl-20 lg:max-w-3xl mt-20 min-w-[75%]'>
        <h3 className='text-xl text-center font-medium text-left lg:text-4xl lg:mb-3'>{text.liked.title}</h3>
         <div className='flex items-center my-2 lg:mb-5'>
          {/* <img src={authState.user.profilePicture} alt="User" className='user-profile-img mr-2' />
          <p className='mr-3 text-xs capitalize font-bold'>{authState.user.firstName}</p> */}
       {/*   <p className='text-gray-500 my-2 text-xs'>49 {text.liked.total}</p> */}
        </div> 

        <div className='grid grid-cols-4 justify-between hidden lg:grid'>
          <p>#</p>
          <p>{text.liked.title_table}</p>
          <p>{text.liked.album_table}</p>
          <FaClock />
        </div>   
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