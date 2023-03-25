import { FaHeart } from 'react-icons/fa'

const Chart = ({ img, title, artist, isLike }) => {

  return (
    <div className='section__chart'>

      <div className='chart__img-container'>
        <img src={img} alt={title} className="chart__img-container--img" />
      </div>

      <div className='chart__data-container'>
        <div className='chart__data-container--data'>
          <p className='chart__data-container--data-title'>{title}</p>
          <p className='chart__data-container--data-artist'>{artist}</p>
        </div>

        <div className={`${isLike ? "border-red-500" : "border-gray-400"} chart__data-container--like`}>
          <FaHeart className={isLike ? "text-red-500" : "text-gray-600"} />
        </div>
      </div>

    </div>
  )
}

export default Chart;