import './Cover.css';

const Cover = ({ loaded, setLoaded }) => {



  return (
    <div className="carousel">
      <div className="carousel-images relative">
        <img src="https://www.mondosonoro.com/wp-content/uploads/2016/02/zoo.jpg" alt='Cover' onLoad={() => setLoaded(true)} className={`carousel-image ${loaded ? 'loaded' : ''}`} width="" height="" />
      </div>
    </div>
  )
}

export default Cover