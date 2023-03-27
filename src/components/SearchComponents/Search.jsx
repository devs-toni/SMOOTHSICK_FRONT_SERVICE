import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Filters, useLanguage, useGlobalContext, SearchSection, OutputBox } from '../../index';
import { FILTER_TYPES } from './filterTypes';
import { v4 as uuidv4 } from 'uuid';

const Search = () => {

  const initialState = {
    playlists: [],
    tracks: [],
/*     users: [],
 */    albums: [],
    artists: [],
  }

  const { dataState } = useGlobalContext();
  const { playlists, tracks, users, albums, artists } = dataState;
  const all = [
    false,
    [...playlists],
    [...tracks],
/*     [...users],
 */    [...albums],
    [...artists],
  ]

  const items = {
    playlists,
    tracks,
/*     users,
 */    albums,
    artists,
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
          /*           users: users.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())), */
          albums: albums.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())),
          artists: artists.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())),
        })
        setNameFilter(text.filters.all)
      } else {
        let firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
        switch (active.toLowerCase()) {
          case "playlists":
            setNameFilter(text.filters.playlists)
            firstResults = firstResults.map(playlist => {
              return {
                name: playlist.name,
                img: playlist.thumbnail,
                artist: ""
              }
            })
            break;
          case "albums":
            setNameFilter(text.filters.albums)
            firstResults = firstResults.map(album => {
              return {
                name: album.name,
                img: album.imageUrl,
                artist: album.artist
              }
            })
            break;
          case "tracks":
            setNameFilter(text.filters.tracks)
            firstResults = firstResults.map(track => {
              return {
                name: track.name,
                img: track.thumbnail,
                artist: track.artist
              }
            })
            break;
          /*           case "users":
                      firstResults = firstResults.map(user => {
                        return {
                          name: user.name,
                          img: user.profilePicture,
                          artist: ""
                        }
                      })
                      break; */
          case "artists":
            setNameFilter(text.filters.artists)
            firstResults = firstResults.map(artist => {
              return {
                name: artist.name,
                img: artist.photoUrl,
                artist: ""
              }
            })
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
    if (currentSearch.length > 0 && strSearch.length > 0) {
      let firstResults = [];

      switch (active.toLowerCase()) {
        case "playlists":
          setNameFilter(text.filters.playlists)
          firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase()));
          firstResults = firstResults.map(playlist => {
            return {
              name: playlist.name,
              img: playlist.thumbnail,
              artist: ""
            }
          })
          break;
        case "albums":
          setNameFilter(text.filters.albums)
          firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase()));
          firstResults = firstResults.map(album => {
            return {
              name: album.name,
              img: album.imageUrl,
              artist: album.artist
            }
          })
          break;
        case "tracks":
          setNameFilter(text.filters.tracks)
          firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase()));
          firstResults = firstResults.map(track => {
            return {
              name: track.name,
              img: track.thumbnail,
              artist: track.artist
            }
          })
          break;
        /*         case "users":
                  firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase()));
                  firstResults = firstResults.map(user => {
                    return {
                      name: user.name,
                      img: user.profilePicture,
                      artist: ""
                    }
                  })
                  break; */
        case "artists":
          setNameFilter(text.filters.artists)
          firstResults = currentSearch.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase()));
          firstResults = firstResults.map(artist => {
            return {
              name: artist.name,
              img: artist.photoUrl,
              artist: ""
            }
          })
          break;
        case "all":
          setNameFilter(text.filters.all)
          setAllResults({
            playlists: playlists.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())),
            tracks: tracks.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())),
            /*             users: users.filter((item) => item.name.toLowerCase().includes(strSearch.toLowerCase())), */
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
      <div className="sm:w-3/4 flex flex-col items-center justify-center mt-10 md:mt-24 overflow-hidden m-auto z-10">
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
        <div className='m-auto w-full'>
          {
            active === FILTER_TYPES.ALL
              ?
              (
                <>
                  {allResults.tracks.length > 0 && <SearchSection check={FILTER_TYPES.TRACKS} list={allResults.tracks} name={text.filters.tracks} />}
                  {allResults.playlists.length > 0 && <SearchSection check={FILTER_TYPES.PLAYLISTS} list={allResults.playlists} name={text.filters.playlists} />}
                  {allResults.artists.length > 0 && <SearchSection check={FILTER_TYPES.ARTISTS} list={allResults.artists} name={text.filters.artists} />}
                  {allResults.albums.length > 0 && <SearchSection check={FILTER_TYPES.ALBUMS} list={allResults.albums} name={text.filters.albums} />}
                  {/*                       {allResults.users.length > 0 && <SearchSection name="Users" list={allResults.users} name={text.filters.users} />} */}
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
                      results.map(({ name, img, artist }) => {
                        return (
                          <OutputBox
                            key={uuidv4()}
                            image={img}
                            name={name}
                            artist={artist}
                            targetClass="search"
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