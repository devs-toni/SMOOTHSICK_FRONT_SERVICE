import { NavLink } from "react-router-dom";
import { DETAILS } from "../../router/paths";

const Soundbox = ({ id, name, image, artist }) => {

  return (
    <NavLink to={`/${DETAILS}/album/1`}>
      <div className='row__list--item bg-zinc-900'>
        <div className='item__img-container'>
          <img
            src={image}
            alt={name}
            className='item__img-container--img'
          />
        </div>
        <div className="item__data">
          <p className="item__data--name">{name}</p>
          <p className="item__data--artist">{artist}</p>
        </div>
      </div >
    </NavLink>
  )
}

export default Soundbox