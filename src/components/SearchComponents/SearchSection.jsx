import { v4 as uuidv4 } from 'uuid';
import { OutputBox } from '../../index';

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
                <OutputBox
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