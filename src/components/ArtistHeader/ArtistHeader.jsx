import './ArtistHeader.css';
import { FaHeart, FaPlay } from "react-icons/fa";

export const ArtistHeader = ({ img, name, fans, isLike }) => {
  return (
    <div className='artist-header'>
      <img className='artist-img' src={img} width="" height="" />
      <div className='artist-data'>
        <p className='artist-data__name'>{name}</p>
        <p className='artist-data__fans'>{fans} fans</p>
        <div className='artist-functions'>
          <button className='artist-mix bg-deezer'>
            <FaPlay className='artist-mix__play' />
            <p className='artist-mix__name'>MIX</p>
          </button>
          <FaHeart className={`artist-like ${isLike && 'isLike'}`} />
        </div>
      </div>
    </div>
  )
}