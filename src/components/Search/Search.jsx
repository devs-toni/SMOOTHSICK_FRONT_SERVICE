import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FILTER_TYPES } from './filterTypes';
import { v4 as uuidv4 } from 'uuid';
import "./Search.css";
import Filters from '../Filters/Filters';
import HomeSongCard from '../HomeSongCard/HomeSongCard';
import SearchSection from '../SearchSection/SearchSection';
import { useGlobalContext } from '../../context/GlobalContext';

const Search = () => {

  const { dataState } = useGlobalContext();

  const initialState = {
    playlists: dataState.playlists,
    albums: dataState.albums,
    artists: dataState.artists,
    tracks: []
  }

  const all = [
    false,
    [...dataState.playlists],
    [...dataState.albums],
    [...dataState.artists],

  ]

  const items = {
    playlists: dataState.playlists,
    albums: dataState.albums,
    artists: dataState.artists,
    all
  }

  const { text } = useLanguage();

  const [active, setActive] = useState(FILTER_TYPES.ALL);
  const [nameFilter, setNameFilter] = useState(text.filters.all)
  const [currentSearch, setCurrentSearch] = useState(all);

  const [results, setResults] = useState([]);
  const [allResults, setAllResults] = useState(initialState);

  const styleInput = {
    backgroundColor: "#00000000",
    color: 'white',
    textAlign: 'center',
    borderBottom: "1px solid #4d4d4d"
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const strSearch = searchParams.get('q') ?? '';


  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearchParams({ q: value });
    if (value.length !== 0) {
      if (active === FILTER_TYPES.ALL) {
        setAllResults({
          playlists: playlists.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())),
          tracks: tracks.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())),
          albums: albums.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())),
          artists: artists.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())),
        })
        setNameFilter(text.filters.all)
      } else {
        let firstResults = [];
        switch (active) {
          case FILTER_TYPES.PLAYLISTS:
            firstResults = currentSearch.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
            setNameFilter(text.filters.playlists)
            break;
          case FILTER_TYPES.ALBUMS:
            firstResults = currentSearch.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
            setNameFilter(text.filters.albums)
            break;
          case FILTER_TYPES.TRACKS:
            firstResults = currentSearch.filter((item) => item.title.toLowerCase().includes(value.toLowerCase()));
            setNameFilter(text.filters.tracks)
            break;
          case FILTER_TYPES.ARTISTS:
            firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
            setNameFilter(text.filters.artists)
            break;
        }
        setResults(firstResults)
      }
    } else {
      setResults([]);
      setAllResults(initialState);
    }
  };

  useEffect(() => {
    setSearchParams({ q: '' })
  }, [])


  useEffect(() => {
    if (strSearch.length === 0) {
      setAllResults(initialState);
      setResults([]);
    }
  }, [strSearch.length])

  useEffect(() => {
    if (currentSearch?.length > 0 && strSearch.length > 0) {
      let firstResults = [];

      switch (active) {
        case FILTER_TYPES.PLAYLISTS:
          setNameFilter(text.filters.playlists)
          firstResults = currentSearch.filter((item) => item.title.toLowerCase().includes(strSearch.toLowerCase()));
          break;
        case FILTER_TYPES.ALBUMS:
          setNameFilter(text.filters.albums)
          firstResults = currentSearch.filter((item) => item.title.toLowerCase().includes(strSearch.toLowerCase()));
          break;
        case FILTER_TYPES.TRACKS:
          setNameFilter(text.filters.tracks)
          firstResults = currentSearch.filter((item) => item.title.toLowerCase().includes(strSearch.toLowerCase()));
          break;
        case FILTER_TYPES.ARTISTS:
          setNameFilter(text.filters.artists)
          firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase()));
          break;
        case FILTER_TYPES.ALL:
          setNameFilter(text.filters.all)
          setAllResults({
            playlists: playlists.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())),
            tracks: tracks.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())),
            albums: albums.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())),
            artists: artists.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())),
          })
          break;
      }
      setResults(firstResults)
    }
  }, [active])

  return (
    <div className='flex w-full pb-32'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        <form className='flex w-full justify-center mt-10'>
          <input
            type="text"
            placeholder={text.navbar.input_p_holder}
            autoFocus
            style={styleInput}
            value={strSearch}
            onChange={handleSearch}
          />
        </form>
        <Filters
          active={active}
          setActive={setActive}
          setCurrentSearch={setCurrentSearch}
          items={items}
        />
        <div className='max-w-81rem'>
          {
            active === FILTER_TYPES.ALL
              ?
              (
                <>
                  {allResults.tracks.length > 0 && <SearchSection check={FILTER_TYPES.TRACKS} list={allResults.tracks} name={text.filters.tracks} />}
                  {allResults.playlists.length > 0 && <SearchSection check={FILTER_TYPES.PLAYLISTS} list={allResults.playlists} name={text.filters.playlists} />}
                  {allResults.artists.length > 0 && <SearchSection check={FILTER_TYPES.ARTISTS} list={allResults.artists} name={text.filters.artists} />}
                  {allResults.albums.length > 0 && <SearchSection check={FILTER_TYPES.ALBUMS} list={allResults.albums} name={text.filters.albums} />}
                </>
              )
              :
              (
                <>
                  {
                    results.length > 0 && <h1 className='search__title'>{nameFilter}</h1>
                  }
                  <div className='search__section'>
                    {
                      results.map(obj => {
                        return (
                          <HomeSongCard
                            key={uuidv4()}
                            obj={obj}
                            targetClass="search"
                            type={nameFilter.toUpperCase()}
                            isSearch={true}
                          />
                        )
                      })
                    }
                  </div>
                </>
              )
          }
        </div>
      </div>
      <div className="headphones-image"></div>
    </div>
  )
}

export default Search