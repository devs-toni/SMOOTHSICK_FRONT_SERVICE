import React from 'react';


export const SongCard = ({ img, name, artist }) => {
	return (

		<figure className=" flex items-center justify-center relative max-w-sm transition-all duration-300 cursor-pointer text-center hover:text-pink-700  filter grayscale hover:grayscale-0 w-44">
			<img className="rounded-lg" src={img} alt="image description" />
			<figcaption className="  absolute text-lg text-white  font-bold bottom-6">
				<span className=" mb-2 text-md ">{name}</span>
				<p className="text-sm mb-3 font-normal ">{artist}</p>
			</figcaption>
		</figure>

	)
};
