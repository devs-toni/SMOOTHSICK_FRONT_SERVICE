import { v4 as uuidv4 } from 'uuid';
import { Chart, useLanguage } from '../../index';

const Section = ({ tracks, loaded }) => {
  const { text } = useLanguage();
  return (
    <div className={`section ${loaded ? 'loaded' : ''}`}>
      <h3 className='section__title'>{text.charts.title}</h3>
      <div>
        {
          tracks.map(({ id, name, artist, thumbnail, liked }) => {
            return (
              <Chart
                key={uuidv4()}
                img={thumbnail}
                title={name}
                artist={artist}
                isLike={liked} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Section;