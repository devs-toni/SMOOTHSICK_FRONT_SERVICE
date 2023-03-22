import React from "react"

const Soundbox = ({ id, name, image, artist }) => {
  return (
    <div className="bg-chart box-shadow mt-2 p-5 w-5/6 text-left mr-7 rounded-md papel">


      <div className="flex flex-row justify-between text-center mb-3 w-full h-full">
        <img src={image} alt={name} className="rounded-lg w-full h-full" />
      </div>

      <div className="mt-2 pl-1">

        <p className="font-medium text-md mb-2">{name}</p>
        <p className="text-sm">{artist}</p>


      </div>





    </div>


  )
}

export default Soundbox