import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import AddSongModal from "../AddSongModal/AddSongModal";
import { useFetchMyTracks } from "../../hooks";
import { DetailsCard } from "../partials/DetailsCard/DetailsCard";
import { v4 as uuidv4 } from 'uuid';
import { useLanguage } from "../../context/LanguageContext";
import { BsClock } from "react-icons/bs";
import unknown from '../../assets/imgs/UnkownAlbum.jpg';

const MySongs = () => {

  const [open, setOpen] = useState(false);
  const { text } = useLanguage();
  const { myTracks, myTracksLoaded } = useFetchMyTracks();

  return (
    <div className="flex w-full items-center justify-center pb-24">
      <div className="w-full h-full  p-6 md:max-w-2xl md:pl-20 lg:max-w-3xl mt-14 md:mt-20 min-w-[75%]">
        <AddSongModal setOpen={setOpen} open={open} />
        <div className="flex flex-col items-center justify-center h-full pt-20 w-full">
          <div className=" h-60 w-60 flex flex-col gap-2 rounded-lg items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200 mb-12" onClick={setOpen}>
            <AiOutlinePlus size={40} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-500 mt-8" />
            <span>Add</span>
          </div>
          <div className="z-5 flex flex-col h-25 text-center justify-center w-8/6 min-w-[100%] ">
            <div className='flex items-center justify-between border-b border-b-gray-300'>
              <p className="w-1/12">#</p>
              <p className="w-2/12">{text.liked.track}</p>
              <p className="w-2/12"></p>
              <p className="w-3/12">Options</p>
              <p className="w-3/12">{text.liked.album_table}</p>
              <p className="w-2/12">{text.liked.gender}</p>
              <p className="w-2/12"><BsClock className='w-11/12' /></p>
            </div>
          </div>
          {
            myTracksLoaded && myTracks.map((track, index) => {
              return (
                <DetailsCard
                  key={uuidv4()}
                  track={track}
                  count={index}
                  ownerImage={unknown}
                  tracks={myTracks}
                  playlistName="Owner"
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default MySongs