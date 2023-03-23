import React from 'react';
import { useLanguage } from '../../context/LanguageContext';


export const SongCard = ({ img, name, artist, id }) => {

	return (

		<div className='flex w-full items-center justify-center h-full'>
			<div className='w-full md:max-w-2xl lg:max-w-3xl min-w-[75%] pt-3'>
				<div className='flex items-center rounded-xl bg-box-icons h-24'>
					<span className='w-1/12'>{id + 1}</span>
					<div className=' flex w-3/12 items-center justify-center'>
						<img className="rounded-lg w-16 " src={img} alt="image description" />
					</div>
					<span className="text-xs w-8/12 md:text-md grow">{name}</span>
					<p className="text-xs font-normal w-4/12 md:text-md ">{artist}</p>
				</div>
			</div>
		</div>

	)
};
