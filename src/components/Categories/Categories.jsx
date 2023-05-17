
import { SongCard } from "./CategoriesSongCard/CategoriesSongCard";
import { useEffect, useState, Fragment } from "react";
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { Link, useParams } from "react-router-dom";
import { FAVOURITES } from '../../router/paths'
import { v4 as uuidv4 } from 'uuid';
import { BsClock } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import CreatePlaylistModal from "./CreatePlaylistModal/CreatePlaylistModal";
import { Avatar, Button } from "flowbite-react";
import { FaRandom } from "react-icons/fa";
import NewListCard from "./ListCard/ListCard";
import { ComunityPlaylists } from "./ComunityPlaylists/ComunityPlaylists";
import headPhone from "../../assets/imgs/background-headphones.jpg";
import { opacity } from "@cloudinary/url-gen/actions/adjust";
import { MdDesktopAccessDisabled } from "react-icons/md";
import { MenuCategories } from "./MenuCategories/MenuCategories";
import { Favourites } from "../Favourites/Favourites";
import MySongs from "../MySongs/MySongs";


export const Categories = () => {
  const { text } = useLanguage();
  const { path } = useParams();
  const { userState } = useUser();
  const { authState } = useAuth();
  const { userPlaylist } = userState
  const [totalTracks, setTotalTracks] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (userPlaylist.length > 0) {
      setTotalTracks(userPlaylist.length)
    }
  }, [userPlaylist.length])



  return (
    <div className="w-full min-h-screen bg-no-repeat bg-cover bg-fixed"
      style={{
        backgroundImage: `url(${headPhone})`,
      }}
    >

      <div className="h-full p-4 md:ml-20 lg:ml-52">
        <CreatePlaylistModal setOpen={setOpen} open={open} />
        <div className="flex flex-col items-start justify-center lg:ml-20 lg:mr-20 pt-24 mb-24 gap-5">
          {
            authState.isAuthenticated
              ?
              <>
                <div className="flex items-center gap-10 mb-5">
                  <img
                    src={authState.user.profilePicture}
                    alt="User profile picture"
                    className="w-20 md:w-32 rounded-full"
                  />
                  <div className="flex flex-col gap-3">
                    <span className="text-xl md:text-2xl inline-block">{authState.user.firstName + " " + authState.user.lastName}</span>
                    <Button
                      pill={true}
                      className="bg-deezer hover:bg-zinc-800"
                    >
                      <FaRandom size={12} className="mr-2" />
                      {text.playlists.random}
                    </Button>
                  </div>
                </div>
                <MenuCategories />
                {
                  path === "playlist"
                    ?
                    <>
                      <div className="inline-flex items-center">
                        <h3 className="text-left text-xl md:text-2xl lg:text-4xl md:py-4 lg:py-6">{text.categories.lists}</h3>
                        <span>{totalTracks.length}</span>
                      </div>
                      <div className="grid items-center grid-cols-3 gap-7 md:grid-cols-4 md:gap-7 lg:grid-cols-6 lg:gap-10 mb-5">
                        <div className=" w-24 h-24 md:w-36 md:h-36 lg:h-60 lg:w-60 flex flex-col text-xs md:text-lg rounded-lg items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200" onClick={() => setOpen(true)}>
                        <span>{text.playlists.span}</span>
                          <AiOutlinePlus size={32} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-500" />
                        </div>
                        {
                          userPlaylist.map((list, index) => (
                            <NewListCard
                              key={index}
                              id={list._id}
                              title={list.title}
                            />
                          ))
                        }
                      </div>
                      <ComunityPlaylists />
                    </>
                    :
                    path === "favourites"
                      ?
                      < Favourites />
                      :
                      <MySongs />
                }
              </>
              :
              <ComunityPlaylists />
          }

        </div>
      </div>
    </div>
  );
};

