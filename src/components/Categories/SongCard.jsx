import React from 'react';


export const SongCard = ({ img, name, artist }) => {
	return (

		<figure className="relative max-w-sm transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0 hover:text-black">
			<img className="rounded-lg" src={img} alt="image description" />
			<figcaption className="absolute px-4 text-lg text-white hover:text-black bottom-6">
				<h5 className="text-lg mb-2 font-bold tracking-tight ">{name}</h5>
				<p className="text-sm mb-3 font-normal ">{artist}</p>
			</figcaption>
		</figure>

	)
};
