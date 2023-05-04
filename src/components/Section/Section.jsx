import { v4 as uuidv4 } from 'uuid';
import './Section.css';
import HomeSongCard from '../HomeSongCard/HomeSongCard';
import { useLanguage } from '../../context/LanguageContext';
import { FILTER_TYPES } from '../Search/filterTypes';

const Section = ({ tracks, loaded }) => {
  const { text } = useLanguage();
  return (
    <div className={`section ${loaded ? 'loaded' : ''}`}>
      <h3 className='section__title'>{text.charts.title}</h3>
      <div className="section__cont">
        {
          tracks.map(obj => {
            return (
              <HomeSongCard
                key={uuidv4()}
                obj={obj}
                targetClass="chart"
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