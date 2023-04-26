import { v4 as uuidv4 } from 'uuid';
import { HomeSongCard, SECTIONS, useLanguage } from '../../index';
import './Section.css';

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
                type={SECTIONS.TRACK}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default Section;