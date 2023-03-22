import React from "react"

const Soundbox = ({ id, name, image, artist }) => {
  return (
    <div className="bg-chart box-shadow mt-2 px-5 py-3 w-3/6 text-left mr-7 rounded-md">
      <div className="flex flex-row justify-between text-center">
        <img src={image} alt={name} className="rounded-lg w-full h-full" />
      </div>
      <p className="mt-2 font-medium text-md">{name}</p>
      <p className="mt-2 text-sm">{artist}</p>
    </div>
  )
}

export default Soundbox