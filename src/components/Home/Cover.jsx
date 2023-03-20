import { FaHeart } from "react-icons/fa";

const Cover = () => {
  return (
    <div className="w-full mr-6">
      <div className="bg-home-pattern bg-no-repeat bg-cover px-4 py-3 rounded-3xl flex flex-col justify-between h-full">
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