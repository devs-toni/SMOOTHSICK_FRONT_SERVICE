import { NavLink } from "react-router-dom";
import { DETAILS } from "../../router/paths";

const OutputBox = ({ id, name, image, artist, targetClass }) => {

  return (
    <NavLink to={`/${DETAILS}/album/1`}>
      <div className={`row__${targetClass}--item bg-zinc-900`}>
        <div className={`${targetClass}__img-container`}>
          <img
            src={image}
            alt={name}
            className={`${targetClass}__img-container--img`}
            width=""
            height=""
          />
        </div>
        <div className={`${targetClass}__data`}>
          <p className={`${targetClass}__data--name`}>{name}</p>
          <p className={`${targetClass}__data--artist`}>{artist}</p>
        </div>
      </div >
    </NavLink>
  )
}

export default OutputBox