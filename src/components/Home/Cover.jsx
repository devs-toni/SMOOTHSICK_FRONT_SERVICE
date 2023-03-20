import { FaHeart } from "react-icons/fa";

const Cover = () => {
  return (
    <div className="w-full sm:w-3/5 sm:max-w-3xl p-6 h-full">
      <div className="bg-red-500 px-4 py-3 rounded-xl min-h-100 flex flex-col justify-between">
        <div className="mb-20">
          <p className="italic font-thin text-xs pt-1">Current playlist</p>
        </div>
        <div className="flex flex-col">
          <p className="font-bold">R & B Hits</p>
          <p className="italic text-xs pb-4">Album pepito de los mejores exitos del exito mundial prueba</p>
          <div className="flex">
            <FaHeart className="mr-3"/>
            <p className="italic text-sm">2351</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cover