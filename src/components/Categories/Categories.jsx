import { SongCard } from "../Categories/SongCard";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { data } from "autoprefixer";
import { useUser } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { FAVOURITES } from '../../router/paths'

export const Categories = () => {
  const { userLists } = useUser();
  const { text } = useLanguage();
  const { dataState } = useGlobalContext();
  const { authState } = useAuthContext();

  const [selectedList, setSelectedList] = useState();
  const [currentList, setCurrentList] = useState();
  const [selectedListId, setSelectedListId] = useState();
  const [hoverList, setHoverList] = useState();
  const [changeImg, setChangeImg] = useState();

  const [imgs, setImgs] = useState([]);
  const [currentImage, setCurrentImage] = useState('');


  const handleSetBgImg = ({ target }) => {
    const { id } = target;
    const hoverList = userLists.find((i) => i.id === parseInt(id));
    const newArray = hoverList.songs.slice(0, 4);
    setImgs(newArray.map(img => img.thumbnail));
  }


  const handleRemoveBgImg = () => {
    setImgs([])
  }

  const handleLists = (e) => {
    setCurrentList(e.target.id);
  };

  useEffect(() => {
    if (userLists) {
      setSelectedList(userLists.find((i) => i.id === parseInt(currentList)));
      setHoverList(
        userLists.find((i) => i.id === parseInt(selectedListId))
      );
      if (hoverList) {
        setChangeImg(hoverList.songs[0].thumbnail);
      }
    }
  }, [currentList, selectedListId, hoverList]);

  return (
    <>
      {/*       <img
        src={changeImg}
        alt="pruebaa"
        className="z-auto right-0 fixed w-screen h-screen object-cover opacity-20"
      /> */}
      <div className="absolute h-full w-full">
        <div className="background-div" style={{
          top: 0,
          left: 0,
          backgroundImage: `url(${imgs[0]})`
        }}></div>
        <div className="background-div" style={{
          top: 0,
          right: 0,
          backgroundImage: `url(${imgs[1]})`
        }}></div>
        <div className="background-div" style={{
          bottom: 0,
          left: 0,
          backgroundImage: `url(${imgs[2]})`
        }}></div>
        <div className="background-div" style={{
          bottom: 0,
          right: 0,
          backgroundImage: `url(${imgs[3]})`
        }}></div>
      </div>

      <div className="grid grid-rows-2 gap-8 pt-24 pr-24 pl-24  h-full w-full">
        <div className="z-10 flex center  flex-row gap-10 justify-center mt-4 rounded-xl md:min-w-400 lg:min-w-400 xl:min-w-400">
          <Link to={`/${FAVOURITES}`}
            className="flex flex-col items-center  border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl h-3/4 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200 transition duration-500 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col justify-between p-4 leading-normal">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">
              {text.categories.canciones_fav}
              </h5>
              
              <p className="mr-3 text-xs capitalize font-bold text-gray-800">
                {authState.user.firstName}
              </p>
              <p className="text-withe-500 my-2 text-xs  text-gray-800">
                49 {text.liked.total}
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-4 items-center justify-center m-10">
            <h3 className="text-3xl ">{text.categories.lists}</h3>
            <div className="grid grid-cols-2 gap-10 items-center justify-center">
              {userLists &&
                userLists.map((element) => (
                  <React.Fragment key={element.id}>
                    <div

                      className="rounded-lg grid grid-rows-2 grid-flow-col w-32 relative filter grayscale hover:grayscale-0"
                      onMouseEnter={handleSetBgImg}
                      onMouseOut={handleRemoveBgImg}
                      onClick={handleLists}
                    >
                      <img
                        className=" cursor-pointer rounded-tl-lg"
                        src={element.songs[0].thumbnail}
                        alt="list imgs"
                      />
                      <img
                        className=" cursor-pointer rounded-bl-lg"
                        src={element.songs[1].thumbnail}
                        alt="list imgs"
                      />
                      <img
                        className=" cursor-pointer rounded-tr-lg"
                        src={element.songs[2].thumbnail}
                        alt="list imgs"
                      />
                      <img
                        className=" cursor-pointer rounded-br-lg"
                        src={element.songs[3].thumbnail}
                        alt="list imgs"
                      />
                      <span
                        id={element.id}
                        className="absolute flex items-center justify-center p-4 h-full w-full text-white text-2xl "
                      >
                        {element.name}
                      </span>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 place-items-center h-34 text-center justify-center w-full ">
          {selectedList?.songs &&
            selectedList.songs.map((data, i) => (
              <SongCard
                key={i}
                data={data}
                img={data.thumbnail}
                name={data.name}
                artist={data.artist}
              />
            ))}
        </div>
      </div>
    </>
  );
};
