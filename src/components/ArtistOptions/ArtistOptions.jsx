import { useLanguage } from '../../context/LanguageContext';
import './ArtistOptions.css';

export const ArtistOptions = () => {

  const { text } = useLanguage();

  return (
    <div className='artist-options'>
      <p className='artist-options__option selected'>{text.details.albums}</p>

    </div>
  )
}
