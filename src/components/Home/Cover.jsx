import { useEffect, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";


const Cover = ({ artists, autoPlay, showButtons, selectedIndex, setSelectedIndex, setSelectedTracks, loaded, setLoaded, tracks }) => {


  const [selectedImage, setSelectedImage] = useState(artists[0].photoUrl);

  const previous = () => {
    selectNewImage(selectedIndex, artists, false);
  }

  const next = () => {
    selectNewImage(selectedIndex, artists);
  }

  const selectNewImage = (index, images, next = true) => {
    setLoaded(false);
    setTimeout(() => {
      const condition = next ? index < images.length - 1 : index > 0;
      const nextIndex = next ?
        (condition ? index + 1 : 0)
        : (condition ? index - 1 : images.length - 1);
      setSelectedImage(artists[nextIndex].photoUrl);
      setSelectedIndex(nextIndex);
      setSelectedTracks(tracks[nextIndex]);
    }, 500)
  }

  useEffect(() => {
    if (autoPlay || !showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, artists);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [selectNewImage])


  return (
    <div className="carousel">
      {showButtons &&
        <div className="nav">
          <AiOutlineLeft onClick={previous} className="nav-icon" />
          <AiOutlineRight onClick={next} className="nav-icon" />
        </div>
      }
      <div className="carousel-images relative">
        <img src={selectedImage} alt='Cover' onLoad={() => setLoaded(true)} className={`carousel-image ${loaded ? 'loaded' : ''}`} />
        <div className={`px-6 py-6 rounded-3xl w-full flex flex-row justify-between absolute top-0 data ${loaded ? 'loaded' : ''}`}>
          <div className="flex flex-col">
            <p className="text-sm md:text-2xl font-bold">{artists[selectedIndex].name}</p>
          </div>
          <div className="flex text-sm">
            <FaHeart className="mr-3 mt-1" />
            <p className="italic">{artists[selectedIndex].popularity}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cover