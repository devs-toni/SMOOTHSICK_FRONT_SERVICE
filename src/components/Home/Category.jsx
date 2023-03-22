import React from "react"

const Category = ({id, name, imageUrl, artist}) => {
  return (
    <div className="mt-4 p-5 rounded-xl md:min-w-300">


        <div className="flex flex-row justify-between w-11 text-center">
        
        <img src={imageUrl} alt={name} className="rounded-lg w-full max-img" />
        </div>


        <div className="">{artist}</div>
        



    </div>
 

  )
}

export default Category