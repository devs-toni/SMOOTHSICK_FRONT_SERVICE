import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from '../../context/LanguageContext';
import { FILTER_TYPES } from '../Search/filterTypes';

const Filters = ({ active, setActive, showNameFilter, setShowNameFilter, setResults }) => {

  const { text } = useLanguage();

  const handleClick = ({ target }) => {
    const { dataset } = target;
    setActive(dataset.type);
    setResults([]);

    switch (dataset.type) {
      case FILTER_TYPES.ALL:
        return setShowNameFilter(text.filters.all);

      case FILTER_TYPES.ALBUMS:
        return setShowNameFilter(text.filters.albums);

      case FILTER_TYPES.ARTISTS:
        return setShowNameFilter(text.filters.artists);

      case FILTER_TYPES.PLAYLISTS:
        return setShowNameFilter(text.filters.playlists);

      case FILTER_TYPES.TRACKS:
        return setShowNameFilter(text.filters.tracks);

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
    }
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