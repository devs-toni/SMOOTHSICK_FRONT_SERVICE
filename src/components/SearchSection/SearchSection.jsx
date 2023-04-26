import { v4 as uuidv4 } from 'uuid';
import HomeSongCard from '../HomeSongCard/HomeSongCard';

const SearchSection = ({ check, name, list }) => {

  return (
    <>
      <h1 className='search__title'>{name}</h1>
      <div className='search__section'>
        {
          list.length > 0 &&
          (
            list.map(obj => {
              return (
                <HomeSongCard
                  key={uuidv4()}
                  obj={obj}
                  targetClass="search"
                  type={check.toUpperCase()}
                />
              )
            })
          )
        }
      </div>
    </>
  )
}

export default SearchSection