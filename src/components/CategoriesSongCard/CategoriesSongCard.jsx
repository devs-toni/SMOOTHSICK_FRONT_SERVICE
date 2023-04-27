import React from "react";
import { FaHeart } from "react-icons/fa";
import { GiMicrophone } from "react-icons/gi";
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";

export const SongCard = ({ img, name, artist, id, isLike }) => {
  return (
    <div className="flex w-full items-center justify-center h-full">
      <div className="w-full md:max-w-2xl lg:max-w-3xl min-w-[75%] pt-3">
        <div className="flex items-center rounded-xl bg-box-icons h-18">
          {/* 	<span className='w-1/12'>{id + 1}</span> */}
          <div className=" flex w-1/12  items-center justify-center">
            <img
              className="rounded-lg "
              src={img}
              alt="image description"
              width="60px"
              height=""
            />
          </div>
          <div className="text-xs w-3/12 md:text-md grow">
            <span>{name}</span>
          </div>
          <div className="text-xs font-normal w-5/12 md:text-md">
            <p>{artist}</p>
          </div>

          <div
            className={`${
              isLike ? "border-red-500" : "border-gray-400"
            } flex items-center justify-center text-xs md:text-2xl rounded-full my-auto cursor-pointer w-2/12`}
          >
            <FaHeart
              className={`${isLike ? "text-withe-400" : "text-withe-600"} mr-4`}
            />
            <Link to="/">
              <GiMicrophone
                className={`${
                  isLike ? "text-white-400" : "text-withe-600"
                } mr-4`}
              />
            </Link>
            <SlOptions className="text-withe-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
