import { v4 as uuidv4 } from 'uuid'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useRef, useState } from 'react';
import './Slider.css';
import HomeSongCard from '../HomeSongCard/HomeSongCard';

const Slider = ({ list, name, type, isFirstRowSection }) => {

  const divRef = useRef();
  const [rightIsMoved, setRightIsMoved] = useState(false);
  const [leftIsMoved, setLeftIsMoved] = useState(true);

  const handleClick = (direction) => {
    if (direction === "forward") {
      divRef.current.scrollLeft += divRef.current.offsetWidth - 100;
      setRightIsMoved(true);
      setLeftIsMoved(false);

    } else if (direction === "back") {
      divRef.current.scrollLeft -= divRef.current.offsetWidth + 100;
      setLeftIsMoved(true);
      setRightIsMoved(false);
    }
  }

  return (
    <div className='row'>
      {
        list.length > 0 && (
          <>
            <h1 className="text-2xl mb-5 max-sm:text-lg max-sm:mb-2">{name}</h1>
            {
              !isFirstRowSection &&
              <div className='row__arrows'>
                <MdArrowBackIosNew className={`row__arrows--arrow ${leftIsMoved && 'null'}`} onClick={() => handleClick("back")} />
                <MdArrowForwardIos className={`row__arrows--arrow ${rightIsMoved && 'null'}`} onClick={() => handleClick("forward")} />
              </div>
            }
            <div className='row__list' ref={divRef}>
              {
                list.map((obj) => {
                  return (
                    <HomeSongCard
                      key={uuidv4()}
                      obj={obj}
                      targetClass="list"
                      type={type}
                      isFirstRowSection={isFirstRowSection}
                    />
                  )
                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}

export default Slider