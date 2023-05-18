import { v4 as uuidv4 } from 'uuid'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useEffect, useRef, useState } from 'react';
import './Slider.css';
import BoxCard from '../partials/BoxCard/BoxCard';

const Slider = ({ list, name, type, isFirstRowSection, top_tracks, less_tracks }) => {
  const divRef = useRef();
  const [rightIsMoved, setRightIsMoved] = useState(false);
  const [leftIsMoved, setLeftIsMoved] = useState(true);

  const handleClick = (direction) => {

    const scrollLeft = divRef.current.scrollLeft;
    const scrollWidth = divRef.current.scrollWidth;
    const offset = divRef.current.offsetWidth;

    if (direction === "forward") {
      if ((scrollLeft + offset + 2) < scrollWidth) {
        divRef.current.scrollLeft += divRef.current.offsetWidth - 100;
        setLeftIsMoved(false);
        if (scrollWidth - offset - scrollLeft < offset) setRightIsMoved(true);
      }

    } else if (direction === "back" && scrollLeft > 0) {
      divRef.current.scrollLeft -= divRef.current.offsetWidth + 100;
      setRightIsMoved(false);
      if (scrollLeft < offset) setLeftIsMoved(true);

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
            <div className='row__list flex gap-2' ref={divRef}>
              {
                list.map((obj) => {
                  return (
                    <BoxCard
                      key={uuidv4()}
                      obj={obj}
                      targetClass="list"
                      type={type}
                      isFirstRowSection={isFirstRowSection}
                      top_tracks={top_tracks}
                      less_tracks={less_tracks}
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