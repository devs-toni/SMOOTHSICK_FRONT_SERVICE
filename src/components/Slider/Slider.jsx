
import { HomeSongCard, SECTIONS } from '../../index';
import { v4 as uuidv4 } from 'uuid'
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { useRef, useState } from 'react';
import './Slider.css';

const Slider = ({ list, name, type }) => {




  const divRef = useRef();
  const [rightIsMoved, setRightIsMoved] = useState(false);
  const [leftIsMoved, setLeftIsMoved] = useState(true);

  const handleClick = (direction) => {
    if (direction === "forward") {
      divRef.current.scrollLeft += divRef.current.offsetWidth;

    } else if (direction === "back") {
      divRef.current.scrollLeft -= divRef.current.offsetWidth;
    }
  }

  return (
    <div className='row'>
      {
        list.length > 0 && (
          <>
            <h1 className="text-2xl mb-5 max-sm:text-lg max-sm:mb-2">{name}</h1>
            <div className='row__arrows'>
              <MdArrowBackIosNew className={`row__arrows--arrow`} onClick={() => handleClick("back")} />
              <MdArrowForwardIos className={`row__arrows--arrow`} onClick={() => handleClick("forward")} />
            </div>
            <div className='row__list' ref={divRef}>
              {
                list.map((obj) => {
                  return (
                    <HomeSongCard
                      key={uuidv4()}
                      obj={obj}
                      targetClass="list"
                      type={type}
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