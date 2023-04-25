import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../../context/LanguageContext';
import { FILTER_TYPES } from '../Search/filterTypes';

const Filters = ({ active, setActive, setCurrentSearch, items }) => {

  const { text } = useLanguage();

  const handleClick = ({ target }) => {
    const { dataset } = target;
    setActive(dataset.type);

    switch (dataset.type) {
      case FILTER_TYPES.ALL:
        setCurrentSearch(items.all);
        break;
      case FILTER_TYPES.PLAYLISTS:
        setCurrentSearch(items.playlists);
        break;
      case FILTER_TYPES.ALBUMS:
        setCurrentSearch(items.albums);
        break;
      case FILTER_TYPES.ARTISTS:
        setCurrentSearch(items.artists);
        break;
      /*      case FILTER_TYPES.USERS:
              setCurrentSearch(items.users);
              break; */
      case FILTER_TYPES.GENRES:
        setCurrentSearch(items.genres);
        break;
      case FILTER_TYPES.TRACKS:
        setCurrentSearch(items.tracks);
        break;

      default:
        break;
    }
  }

  const filters = [
    {

      id: 0,
      type: FILTER_TYPES.ALL,
      name: text.filters.all
    },
    {
      id: 1,
      type: FILTER_TYPES.PLAYLISTS,
      name: text.filters.playlists
    },
    {
      id: 2,
      type: FILTER_TYPES.ARTISTS,
      name: text.filters.artists
    },
    {
      id: 3,
      type: FILTER_TYPES.ALBUMS,
      name: text.filters.albums
    },
    {
      id: 4,
      type: FILTER_TYPES.TRACKS,
      name: text.filters.tracks
    },
    /*     {
      id: 5,
          type: FILTER_TYPES.USERS
          name: text.filters.users
        } */
  ]

  return (
    <div className='flex flex-row flex-wrap justify-center items-center mt-7 md:mt-8 z-10'>
      {
        filters.map(({ id, type, name }) => {
          return (
            <div key={uuidv4()} className="mb-2 mr-2 md:mr-4 text-center" onClick={handleClick}>
              <p id={id} data-type={type} className={`border border-gray-500 px-3 py-1 md:px-3 rounded-2xl text-xs sm:text-sm md:text-lg  cursor-pointer ${active === type ? 'bg-gray-500' : ''}`}>{name}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Filters