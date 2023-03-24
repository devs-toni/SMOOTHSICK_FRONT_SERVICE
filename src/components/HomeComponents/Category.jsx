
import { useRef, useState } from 'react'
import Soundbox from './Soundbox'
import { v4 as uuidv4 } from 'uuid'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Category = ({ list, name }) => {

/*   const listRef = useRef();
 */
/*   const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0); */

/*   const handleClick = (direction) => {

    let distance = listRef.current.getBoundingClientRect().x - 50;

    if (direction === "left" && slideNumber > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSlideNumber(prevState => prevState - 1);

    } else if (direction === "right" && slideNumber < 5) {
      setIsMoved(true);
      setSlideNumber(prevState => prevState + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
    console.log(distance);
  } */

  return (
    <div className='sectionList'>
      <h1 className="text-2xl">{name}</h1>
      <div className="wrapper">
        <MdKeyboardArrowLeft
          className="sliderArrow sliderLeft"
/*           onClick={() => handleClick('left')} */
/*           style={{ display: !isMoved && 'none' }} */
        />
        <div className='containerList' /* ref={listRef} */ >
          {
            list.map(({ id, name, imageUrl, artist }) => {
              return (
                <Soundbox
                  key={uuidv4()}
                  id={id}
                  name={name}
                  image={imageUrl}
                  artist={artist}
                />
              )
            })
          }
        </div>
        <MdKeyboardArrowRight className="sliderArrow sliderRight" />
      </div>
    </div>
  )
}

export default Category