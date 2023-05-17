import axios from "axios";
import { useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";



export const SongCard = ({ track }) => {
  const mins = Math.floor(track.duration % 3600 / 60)
  const secs = Math.floor(track.duration % 3600 % 60)
  const mDisplay = mins < 10 ? (`0${mins}`) : mins
  const sDisplay = secs < 10 ? (`0${secs}`) : secs

  return (
    <>

      <div className="flex items-center rounded-sm justify-between bg-box-icons ">
        <img className="rounded-sm w-1/12 text-xs md:text-sm  lg:text-md xl:w-14 xl:h-14" src={"dad"} alt="image description" />
        <span className=" w-4/12 text-left text-xs md:text-sm lg:text-md truncate">{track.title}</span>
        <span className=" font-normal text-left w-2/12 text-xs md:text-sm lg:text-md truncate">{ }</span>
        <span className=" font-normal text-center w-1/12 text-xs md:text-sm lg:text-md">{`${mDisplay}:${sDisplay}`}</span>
        <div className="flex items-center justify-center text-xs lg:text-2xl rounded-full cursor-pointer w-2/12">
          {/* <FaHeart className={`${isLike ? "text-withe-400" : "text-withe-600"} mr-1  md:mr-4`} /> */}
          <Link to="/">
            {/* <GiMicrophone className={`${isLike ? "text-white-400" : "text-withe-600"} mr-1 md:mr-4`} /> */}
          </Link>
          <SlOptions className="text-white-600" />
        </div>
      </div>
    </>
  );
};
