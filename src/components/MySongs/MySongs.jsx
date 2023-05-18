import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import AddSongModal from "./AddSongModal/AddSongModal";
import { DetailsCard } from "../partials/DetailsCard/DetailsCard";
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from "../../context/LanguageContext";
import { BsClock } from "react-icons/bs";
import unknown from '../../assets/imgs/UnkownAlbum.jpg';
import { useUser } from "../../context/UserContext";
import UpdateSongModal from "./UpdateSongModal/UpdateSongModal";

const MySongs = () => {

  const [addIsOpen, setAddIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [id, setId] = useState("");
  const { text } = useLanguage();
  const { userState, getMyTracks } = useUser();

  return (
    <>
      <h3 className="text-left text-xl md:text-2xl lg:text-4xl md:py-4 lg:py-6">{text.categories.my_songs}</h3>
      <div className="flex w-full items-center justify-center pb-12">
        <div className="w-full h-full ">
          <UpdateSongModal id={id} setOpen={setUpdateIsOpen} open={updateIsOpen} getMyTracks={getMyTracks} />
          <AddSongModal setOpen={setAddIsOpen} open={addIsOpen} getMyTracks={getMyTracks} />
          <div className="flex flex-col gap-6 mb-14" onClick={setAddIsOpen}>
            <div className="w-24 h-24 md:w-36 md:h-36 lg:h-60 lg:w-60 flex flex-col text-xs md:text-lg rounded-lg items-center justify-center bg-gradient-to-b from-[#ef5567]  transition duration-700 hover:bg-deezer hover:cursor-pointer">
              <AiOutlinePlus size={32} color="black" className="hover:rounded-full  hover:bg-opacity-10 hover:bg-slate-900 " />
            </div>
            <span>Upload your songs</span>
          </div>
          <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
            <div className='flex items-center text-xs md:text-sm lg:text-lg justify-between border-b border-line-section'>
              <p className="hidden md:block w-1/12">#</p>
              <p className="w-2/12">{text.liked.track}</p>
              <p className="w-2/12"></p>
              <p className="w-3/12">Options</p>
              <p className="hidden md:block w-3/12">{text.categories.artist}</p>
              <p className="hidden lg:block w-2/12">{text.liked.gender}</p>
              <BsClock className='w-2/12' />
            </div>
          </div>
          {
            userState?.myTracks.length > 0 && userState?.myTracks.map((track, index) => {
              return (
                <DetailsCard
                  key={uuidv4()}
                  track={track}
                  count={index}
                  ownerImage={unknown}
                  tracks={userState.myTracks}
                  playlistName="Owner"
                  setId={setId}
                  setUpdateIsOpen={setUpdateIsOpen}
                />
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default MySongs