import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { FILTER_TYPES } from './filterTypes';
import { v4 as uuidv4 } from 'uuid';
import "./Search.css";
import Filters from '../Filters/Filters';
import BoxCard from '../partials/BoxCard/BoxCard';
import SearchSection from '../SearchSection/SearchSection';
import axios from 'axios';

const Search = () => {

  const { text } = useLanguage();

  const [active, setActive] = useState(FILTER_TYPES.ALL);
  const [showNameFilter, setShowNameFilter] = useState(text.filters.all);

  const [results, setResults] = useState([]);
  const initialState = {
    playlists: [],
    tracks: [],
    artists: [],
    albums: []
  }
  const [allResults, setAllResults] = useState(initialState);
  const [allEmptyResults, setAllEmptyResults] = useState([]);

  const getEmptyResults = async () => {
    const emptyArtists = await axios.get(import.meta.env.VITE_BACKEND + "artists/home")
      .then(({ data }) => {
        return data;
      })
    const emptyAlbums = await axios.get(import.meta.env.VITE_BACKEND + "albums/home")
      .then(({ data }) => {
        return data;
      })
    const emptyPlaylists = await axios.get(import.meta.env.VITE_BACKEND + "playlists/home")
      .then(({ data }) => {
        return data;
      })
    const emptyTracks = await axios.get(import.meta.env.VITE_BACKEND + "tracks/home")
      .then(({ data }) => {
        return data;
      })
    setAllEmptyResults({
      tracks: emptyTracks,
      artists: emptyArtists,
      albums: emptyAlbums,
      playlists: emptyPlaylists,
    })
  }

  useEffect(() => {
    getEmptyResults();
  }, [])


  const [searchParams, setSearchParams] = useSearchParams();
  const strSearch = searchParams.get('q') ?? '';

  useEffect(() => {
    setSearchParams({ q: '' })
  }, [])

  const fetchSearch = async (active, value) => {

    const fetch = async (entity, isAll) => {
      return await axios.get(import.meta.env.VITE_BACKEND + entity + "/search", { params: { search: value } })
        .then(({ data }) => {
          return !isAll ? setResults(data) : data;
        })
    }

    switch (active) {

      case FILTER_TYPES.PLAYLISTS:
        return fetch(FILTER_TYPES.PLAYLISTS.toLowerCase(), false)
      case FILTER_TYPES.ALBUMS:
        return fetch(FILTER_TYPES.ALBUMS.toLowerCase(), false)
      case FILTER_TYPES.TRACKS:
        if (value.length > 2)
          return fetch(FILTER_TYPES.TRACKS.toLowerCase(), false)
        else break;
      case FILTER_TYPES.ARTISTS:
        return fetch(FILTER_TYPES.ARTISTS.toLowerCase(), false)
      case FILTER_TYPES.ALL:
        const playlists = await fetch(FILTER_TYPES.PLAYLISTS.toLowerCase(), true)
        const albums = await fetch(FILTER_TYPES.ALBUMS.toLowerCase(), true)
        const tracks = value.length > 2 && await fetch(FILTER_TYPES.TRACKS.toLowerCase(), true)
        const artists = await fetch(FILTER_TYPES.ARTISTS.toLowerCase(), true);
        setAllResults({ playlists, albums, tracks, artists });
        return;

      default: break;
    }
  }

  const handleSearch = ({ target }) => {
    const { value } = target;
    setSearchParams({ q: value });

    if (value.length !== 0) {
      fetchSearch(active, value);
      setAllEmptyResults(initialState)
    } else {
      getEmptyResults();
      setAllResults(initialState);
      setResults([]);
    }
  };

  useEffect(() => {
    setAllResults(initialState)
    strSearch.length > 0 && fetchSearch(active, strSearch);
  }, [active])

  const styleInput = {
    backgroundColor: "#00000000",
    color: 'white',
    textAlign: 'center',
    borderBottom: "1px solid #4d4d4d"
  };

  const empty = allResults.albums.length === 0 && allResults.tracks.length === 0 && allResults.artists.length === 0 && allResults.playlists.length === 0 && results.length === 0;

  return (
    <div className='flex justify-center'>
      <div className="sm:w-full flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden z-10 md:ml-20 lg:ml-52">
        <form className='flex w-full justify-center mt-10'>
          <input
            type="text"
            placeholder={text.navbar.input_p_holder}
            autoFocus
            style={styleInput}
            value={strSearch}
            onChange={handleSearch}
            className='w-96'
          />
        </form>
        <Filters
          active={active}
          setActive={setActive}
          showNameFilter={showNameFilter}
          setShowNameFilter={setShowNameFilter}
          setResults={setResults}
        />
        <div className='md:min-w-[28rem] lg:min-w-[85rem]'>
          {
            empty
              ?
              (
                <>
                  {allEmptyResults.artists?.length > 0 && <SearchSection check={FILTER_TYPES.ARTISTS} list={allEmptyResults.artists} name={text.filters.artists} />}
                  {allEmptyResults.playlists?.length > 0 && <SearchSection check={FILTER_TYPES.PLAYLISTS} list={allEmptyResults.playlists} name={text.filters.playlists} />}
                  {allEmptyResults.albums?.length > 0 && <SearchSection check={FILTER_TYPES.ALBUMS} list={allEmptyResults.albums} name={text.filters.albums} />}
                  {allEmptyResults.tracks?.length > 0 && <SearchSection check={FILTER_TYPES.TRACKS} list={allEmptyResults.tracks} name={text.filters.tracks} />}
                </>
              )
              :
              active === FILTER_TYPES.ALL
                ?
                (
                  <>
                    {allResults.artists.length > 0 && <SearchSection check={FILTER_TYPES.ARTISTS} list={allResults.artists} name={text.filters.artists} />}
                    {allResults.playlists.length > 0 && <SearchSection check={FILTER_TYPES.PLAYLISTS} list={allResults.playlists} name={text.filters.playlists} />}
                    {allResults.albums.length > 0 && <SearchSection check={FILTER_TYPES.ALBUMS} list={allResults.albums} name={text.filters.albums} />}
                    {allResults.tracks.length > 0 && <SearchSection check={FILTER_TYPES.TRACKS} list={allResults.tracks} name={text.filters.tracks} />}
                  </>
                )
                :
                (
                  <>
                    {
                      results.length > 0 &&
                      <>
                        <h1 className='search__title'>{showNameFilter}</h1>
                        <div className='search__section'>
                          {
                            results.map(obj => {
                              return (
                                <BoxCard
                                  key={uuidv4()}
                                  obj={obj}
                                  targetClass="search"
                                  type={active}
                                />
                              )
                            })
                          }
                        </div>
                      </>
                    }
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