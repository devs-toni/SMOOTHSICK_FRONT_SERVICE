import { SongCard } from "./CategoriesSongCard";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { FAVOURITES } from '../../router/paths'
import { v4 as uuidv4 } from 'uuid';




export const Categories = () => {
  const { userLists } = useUser();
  const { text } = useLanguage();
  const { authState } = useAuthContext();


  const [selectedList, setSelectedList] = useState();
  const [currentList, setCurrentList] = useState();
  const [selectedListId, setSelectedListId] = useState([]);
  const [hoverList, setHoverList] = useState();
  const [changeImg, setChangeImg] = useState();



  const [imgs, setImgs] = useState([]);



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
    handleSetBgImg(e);
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
      <div className="absolute h-full w-full">
        <div className="flex flex-col items-center justify-center pt-32 gap-12">
          <div className=" z-10 w-5/6 h-3/6 md:w-3/5 md:h5/6 lg:flex lg:justify-between lg:w-4/6 lg:h-full">
            <Link to={`/${FAVOURITES}`}
              className="flex mb-10 rounded-lg lg:flex-none lg:h-80 lg:w-2/4 lg:mr-6 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200"
            >
              <div className="flex flex-col w-full h-full justify-center items-left p-4">
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



            <h3 className="text-1xl text-center font-bold sticky top-0 pb-7 lg:pt-0 lg:text-left lg:p-2 lg:hidden">{text.categories.lists}</h3>
            <div className=" flex flex-col h-80 rounded-lg overflow-y-scroll hide-scrollbar gap-3 lg:gap-2 lg:w-3/6 ">
              {userLists &&
                userLists.map((element) => (
                  <React.Fragment key={uuidv4()}>
                    <div className="flex flex-row justify-between items-center bg-box-icons h-36 lg:h-40 rounded-lg lg:p-5  ">
                      <div className="flex ml-6 h-full items-center">
                        <span className="text-md text-center">List title:{` ` + element.name}</span>
                      </div>
                      <div
                        className="rounded-lg grid grid-rows-2 grid-flow-col w-24 lg:w-28 relative filter grayscale hover:grayscale-0 cursor-pointer"
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
                          className="absolute flex items-center justify-center p-4  h-full w-full text-white text-2xl "
                        >
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                ))}
            </div>
          </div>
          <div className="z-10 flex flex-col h-34 text-center justify-center w-5/6 md:w-3/5 lg:min-w-[75%] ">
            <div className='flex items-center justify-between border-b border-b-gray-300'>
              <p className="w-1/12">#</p>
              <p className="w-3/12">TRACK</p>
              <p className="w-8/12">{text.liked.title_table}</p>
              <p className="w-4/12">{text.liked.album_table}</p>
            </div>
          </div>
          <div className="z-10 mb-20 flex flex-col h-34 text-center justify-center w-5/6 md:w-3/5 lg:min-w-[100%]">
            {selectedList?.songs &&
              selectedList.songs.map((data, index) => (
                <SongCard
                  key={uuidv4()}
                  id={index}
                  data={data}
                  img={data.thumbnail}
                  name={data.name}
                  artist={data.artist}
                />
              ))}
          </div>
        </div>
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
    </>
  );
};
