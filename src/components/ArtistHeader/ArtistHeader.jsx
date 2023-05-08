import { useLanguage } from '../../context/LanguageContext';
import './ArtistHeader.css';
import { FaHeart, FaPlay } from "react-icons/fa";

export const ArtistHeader = ({ img, name, fans, isLike, description }) => {

  const { text } = useLanguage();

  return (
    <div className='artist-header'>
      <img className='artist-img' src={img} width="" height="" />
      <div className='artist-data'>
        <p className='artist-data__name'>{name}</p>
        <p className='artist-data__fans'>{fans} {text.details.fans}</p>
        <div className='artist-functions'>
          <button className='artist-mix bg-deezer'>
            <FaPlay className='artist-mix__play' />
            <p className='artist-mix__name'>{text.details.mix}</p>
          </button>
          <FaHeart className={`artist-like ${isLike && 'isLike'}`} />
        </div>
      </div>
      {
        description &&
        <p>{description}</p>
      }
    </div>
  )
}