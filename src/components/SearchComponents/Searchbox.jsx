import { NavLink } from "react-router-dom";
import { DETAILS } from "../../router/paths";

const Searchbox = ({ id, name, image, artist }) => {

  return (
    <NavLink to={`/${DETAILS}/album/1`}>
      <div className='row__search--item bg-zinc-900'>
        <div className='search__img-container'>
          <img
            src={image}
            alt={name}
            className='search__img-container--img'
          />
        </div>
        <div className="search__data">
          <p className="search__data--name">{name}</p>
          <p className="search__data--artist">{artist}</p>
        </div>
      </div >
    </NavLink>
  )
}

export default Searchbox