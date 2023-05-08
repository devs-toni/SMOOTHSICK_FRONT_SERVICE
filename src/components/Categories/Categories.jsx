
import { SongCard } from "../CategoriesSongCard/CategoriesSongCard";
import { useEffect, useState, Fragment } from "react";
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from "react-router-dom";
import { FAVOURITES } from '../../router/paths'
import { v4 as uuidv4 } from 'uuid';
import "./Categories.css";
import { BsClock } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import CreatePlaylistModal from "./CreatePlaylistModal/CreatePlaylistModal";
import { Avatar, Button } from "flowbite-react";
import { FaRandom } from "react-icons/fa";
import NewListCard from "./ListCard/ListCard";


export const Categories = () => {
  const { lists } = useUser();
  const { text } = useLanguage();
  const { authState } = useAuth();

  const [selectedList, setSelectedList] = useState();
  const [currentList, setCurrentList] = useState();
  const [selectedListId, setSelectedListId] = useState([]);
  const [hoverList, setHoverList] = useState();
  const [changeImg, setChangeImg] = useState();
  const [imgs, setImgs] = useState([]);


  const [open, setOpen] = useState(false);
  const [newList, setNewList] = useState("");
  const [listName, setListName] = useState([]);



  const handleSetBgImg = ({ target }) => {
    const { id } = target;
    const hoverList = lists.find((i) => i.id === parseInt(id));
    const newArray = hoverList.songs.slice(0, 4);
    setImgs(newArray.map(img => img.thumbnail));
  }

  useEffect(() => {
    if (newList) {
      setListName([...listName, newList])
    }
  }, [newList])


  const handleLists = (e) => {
    handleSetBgImg(e);
    setCurrentList(e.target.id);
  };

  useEffect(() => {
    if (lists) {
      setSelectedList(lists.find((i) => i.id === parseInt(currentList)));
      setHoverList(
        lists.find((i) => i.id === parseInt(selectedListId))
      );
      if (hoverList) {
        setChangeImg(hoverList.songs[0].thumbnail);
      }
    }
  }, [currentList, selectedListId, hoverList]);




  return (

    <div className="h-full p-4 md:ml-20 lg:ml-52">
      <CreatePlaylistModal setOpen={setOpen} open={open} setNewList={setNewList} />
      <div className="flex flex-col items-start justify-center ml-20 mr-20 pt-24 gap-5">
        <div className="flex items-center gap-10 mb-5">
          <Avatar
            img={authState.user.profilePicture}
            rounded={true}
            size="xl"
          />
          <div className="flex flex-col gap-3">
            <p className="text-4xl inline-block">{authState.user.firstName + " " + authState.user.lastName}</p>
            <Button
              pill={true}
              className="bg-zinc-900 hover:bg-zinc-800"
            >
              <FaRandom size={12} className="mr-2" />
              My random music
            </Button>
          </div>
        </div>
        <h1 className="text-left text-4xl">{text.categories.lists}</h1>
        {
          <div className="grid grid-cols-6 gap-10">
            <div className=" h-60 w-60 flex flex-col gap-2 rounded-lg items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200" onClick={() => setOpen(true)}>
              <AiOutlinePlus size={40} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-500 mt-8" />
              <span>Create new playlist</span>
            </div>
            
            {
              listName.map((item, index) => (
                <NewListCard
                  key={index}
                  name={item.text}
                />
              ))
            }

          </div>

          // lists &&
          // lists.map((element) => (
          //   <Fragment key={uuidv4()}>
          //     <div className="flex flex-row justify-between items-center rounded-lg bg-box-icons h-36 lg:h-40 lg:p-5  ">
          //       <div className="flex ml-6 h-full items-center">
          //         <span className="text-md text-center">{element.name}</span>
          //       </div>
          //       <div
          //         className={` rounded-lg grid grid-rows-2 grid-flow-col w-24 lg:w-28 relative filter cursor-pointer grayscale-[70%] blur-[1px] hover:grayscale-0 hover:blur-none ${(selectedList?.id === element.id) && 'grayscale-[0] blur-none'}`}
          //         onClick={handleLists}
          //       >
          //         <img
          //           className=" cursor-pointer rounded-tl-lg"
          //           src={element.songs[0].thumbnail}
          //           alt="list imgs"
          //         />
          //         <img
          //           className=" cursor-pointer rounded-bl-lg"
          //           src={element.songs[1].thumbnail}
          //           alt="list imgs"
          //         />
          //         <img
          //           className=" cursor-pointer rounded-tr-lg"
          //           src={element.songs[2].thumbnail}
          //           alt="list imgs"
          //         />
          //         <img
          //           className=" cursor-pointer rounded-br-lg"
          //           src={element.songs[3].thumbnail}
          //           alt="list imgs"
          //         />
          //         <span
          //           id={element.id}
          //           className="absolute flex items-center justify-center p-4 h-full w-full text-white text-2xl "
          //         >
          //         </span>
          //       </div>
          //     </div>
          //   </Fragment>
          // ))

        }

        {/* <Link to={`${FAVOURITES}`}
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
            </Link> */}

        {/* {
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
        } */}
      </div>
      {/* <div className="background-div" style={{
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
      } */}
    </div>
  );
};

