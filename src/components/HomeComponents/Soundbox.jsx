import React from "react"

const Soundbox = ({ name, image, artist, section }) => {
  return (
    <div className="bg-chart box-shadow mt-2 px-2 pt-2 text-left mr-5 mb-4 rounded-md papel">
      <div className="flex flex-row justify-center text-center mb-3">
        <img src={image} alt={name} className="rounded-lg min-w-150 max-h-100l" />
      </div>
      <div className="mt-2 pl-1">
        <p className="font-medium text-md mb-2">{name}</p>
        <p className="text-sm">{artist}</p>
      </div>
    </div>
  )
}

export default Soundbox