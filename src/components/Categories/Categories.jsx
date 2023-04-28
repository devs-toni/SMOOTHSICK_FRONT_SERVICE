
import { SongCard } from "../CategoriesSongCard/CategoriesSongCard";
import { useEffect, useState, Fragment } from "react";
import { useAuthContext } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from "react-router-dom";
import { FAVOURITES } from '../../router/paths'
import { v4 as uuidv4 } from 'uuid';
import "./Categories.css";
import { BsClock } from "react-icons/bs";

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

  console.log(selectedList?.songs);

  return (
    <>
      <div className="h-full p-4 md:ml-20 lg:ml-52">
        <div className="flex flex-col items-center justify-center pt-24 gap-5">
          <h1 className="text-center lg:text-left w-5/6 md:w-3/5 lg:w-4/5 text-xl md:text-3xl lg:text-5xl font-bold">{text.categories.lists}</h1>
          <div className=" z-10 mb-4 h-3/6 w-full xl:w-4/5 lg:flex lg:justify-between lg:h-full">
            <Link to={`${FAVOURITES}`}
              className="flex mb-10 rounded-lg lg:flex-none lg:h-80 lg:w-2/4 lg:mr-6 bg-gradient-to-r from-indigo-200 via-purple-300 to-pink-200"
            >
              <div className="flex flex-col w-full h-full justify-center items-left p-4">
                <h5 className="mb-2 text-sm font-bold tracking-tight text-white dark:text-white">
                  {text.categories.fav_tracks}
                </h5>
                <p className="mr-3 text-xs capitalize font-bold text-gray-800">
                  {authState.user.firstName}
                </p>
                <p className="text-withe-500 my-2 text-xs  text-gray-800">
                  49 {text.liked.total}
                </p>
              </div>
            </Link>

            <div className=" flex flex-col h-80 rounded-lg overflow-y-scroll hide-scrollbar gap-3 lg:gap-2 lg:w-3/6 ">
              {userLists &&
                userLists.map((element) => (
                  <Fragment key={uuidv4()}>
                    <div className="flex flex-row justify-between items-center bg-box-icons h-36 lg:h-40 rounded-lg lg:p-5  ">
                      <div className="flex ml-6 h-full items-center">
                        <span className="text-md text-center">{element.name}</span>
                      </div>
                      <div
                        className={` rounded-lg grid grid-rows-2 grid-flow-col w-24 lg:w-28 relative filter cursor-pointer grayscale-[70%] blur-[1px] hover:grayscale-0 hover:blur-none ${(selectedList?.id === element.id) && 'grayscale-[0] blur-none'}`}
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
                        </span>
                      </div>
                    </div>
                  </Fragment>
                ))}
            </div>
          </div>
          {
            selectedList
            &&
            (
              <>
                <div className="z-10 flex flex-col h-34 text-center justify-center w-full xl:w-4/5">
                  <div className='flex items-center border-b border-b-gray-300 justify-between'>
                    <span className="w-1/12 xl:w-14 text-left text-xs md:text-sm lg:text-md">{text.categories.album_table}</span>
                    <span className="w-4/12 text-left text-xs md:text-sm lg:text-md">{text.categories.track}</span>
                    <span className="w-2/12 text-left text-xs md:text-sm lg:text-md">{text.categories.artist}</span>
                    {<BsClock className="w-1/12 mb-1 text-xs md:text-sm lg:text-md" size={18} />} 
                    <span className="w-2/12 text-xs md:text-sm lg:text-md">{text.categories.options}</span>
                  </div>
                </div>
                <div className="z-10 flex flex-col justify-center pb-20 gap-3 h-30 text-center w-full xl:w-4/5">
                  {selectedList?.songs &&
                    selectedList.songs.map((data) => (
                      <SongCard
                        key={uuidv4()}
                        data={data}
                        img={data.thumbnail}
                        name={data.name}
                        artist={data.artist}
                        track_url={data.url}
                      />
                    ))}
                </div>
              </>
            )
          }
        </div>
        <div className="background-div" style={{
          objectFit: "cover",
          top: 0,
          left: 0,
          backgroundImage: `url(${imgs[0]})`
        }}></div>
        <div className="background-div" style={{
          objectFit: "cover",
          top: 0,
          right: 0,
          backgroundImage: `url(${imgs[1]})`
        }}></div>
        <div className="background-div" style={{
          objectFit: "cover",
          bottom: 0,
          left: 0,
          backgroundImage: `url(${imgs[2]})`
        }}></div>
        <div className="background-div" style={{
          objectFit: "cover",
          bottom: 0,
          right: 0,
          backgroundImage: `url(${imgs[3]})`
        }}></div>
      </div>
      {
        imgs.length === 0 && (
          <div className="headphones-image"></div>
        )
      }
    </>
  );
};

