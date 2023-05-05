import { v4 as uuidv4 } from 'uuid';
import './Section.css';
import './ArtistTracksSection.css';
import HomeSongCard from '../HomeSongCard/HomeSongCard';
import { useLanguage } from '../../context/LanguageContext';
import { FILTER_TYPES } from '../Search/filterTypes';

const Section = ({ tracks, targetClass }) => {
  const { text } = useLanguage();
  return (
    <div className={`${targetClass ? `${targetClass}-section` : "section"}`}>
      <h3 className='section__title'>{text.charts.title}</h3>
      <div className="section__cont">
        {
          tracks.map(obj => {
            return (
              <HomeSongCard
                key={uuidv4()}
                obj={obj}
                targetClass={`${targetClass ? `${targetClass}-chart` : "chart"}`}
                type={FILTER_TYPES.TRACKS}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Section;