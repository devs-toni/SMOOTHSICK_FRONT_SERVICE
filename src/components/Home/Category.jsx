import React from 'react'
import Soundbox from './Soundbox'
import { v4 as uuidv4 } from 'uuid'
const Category = ({ list, name}) => {
    return (
        <div className='mb-10'>
            <h1 className="text-2xl"> {name} </h1>
            <div className="flex flex-row  justify-around items-start  mt-8npm ">

                {
                    list.map(({ id, name, imageUrl, artist }) => {
                        return (
                            <Soundbox
                                key={uuidv4()}
                                id={id}
                                name={name}
                                image={imageUrl}
                                artist={artist}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}

export default Category