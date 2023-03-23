import { v4 as uuidv4 } from 'uuid';
import { FILTER_TYPES } from './filterTypes';

const Filters = ({ active, setActive, setCurrentSearch, items }) => {

  const handleClick = ({ target }) => {
    const { textContent } = target;
    setActive(textContent);

    switch (textContent) {
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
      name: FILTER_TYPES.ALL,
    },
    {
      id: 4,
      name: FILTER_TYPES.PLAYLISTS
    },
    {
      id: 1,
      name: FILTER_TYPES.ARTISTS
    },
    {
      id: 2,
      name: FILTER_TYPES.ALBUMS,
    },
    {
      id: 3,
      name: FILTER_TYPES.TRACKS
    },
    /*     {
          id: 5,
          name: "Users"
        } */
  ]

  return (
    <div className='flex flex-row flex-wrap justify-center items-center mt-10 z-10'>
      {
        filters.map(({ id, name }) => {
          return (
            <div key={uuidv4()} className="mb-2 mr-5 min-w-100 text-center" onClick={handleClick}>
              <p id={id} className={`border border-gray-500 px-4 py-1 rounded-2xl cursor-pointer ${active === name ? 'bg-gray-500' : ''}`}>{name}</p>
            </div>
          )
        })
      }
    </div>
  )
}

export default Filters