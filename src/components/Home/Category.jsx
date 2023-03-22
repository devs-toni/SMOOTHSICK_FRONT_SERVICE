import React from "react"

const Category = ({id, name, imageUrl, artist}) => {
  return (
    <div className="mt-4 p-5 rounded-xl md:min-w-400 lg:min-w-400 xl:min-w-400">


        <div className="flex flex-row justify-between border border-red-400 w-11 h-11 grow text-center">img 1
        <img src={imageUrl} alt={name} className="rounded-lg w-full max-img" />
        </div>


        <div className="">{artist}</div>
        



    </div>
 

  )
}

export default Category