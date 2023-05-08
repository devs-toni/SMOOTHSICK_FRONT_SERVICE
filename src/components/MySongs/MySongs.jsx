import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai"
import AddSongModal from "../AddSongModal/AddSongModal";

const MySongs = () => {

  const [open, setOpen] = useState(false);

  return (
    <div className="h-full flex justify-center items-center md:ml-20 lg:ml-52">
      <AddSongModal setOpen={setOpen} open={open} />
      <div className="flex flex-col items-center justify-center h-full pt-20 w-full">
        <div className=" h-60 w-60 flex flex-col gap-2 rounded-lg items-center justify-center bg-gradient-to-r from-red-200 via-orange-300 to-red-400 hover:cursor-pointer hover:from-red-400 hover:via-orange-300 hover:to-red-200" onClick={setOpen}>
          <AiOutlinePlus size={40} color="black" className="hover:rounded-full hover:bg-opacity-10 hover:bg-slate-500 mt-8" />
          <span>Add</span>
        </div>
      </div>
    </div>
  )
}

export default MySongs