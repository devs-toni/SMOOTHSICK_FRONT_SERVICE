import { SongCard } from "../SongCard/SongCard";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { data } from "autoprefixer";
import { useUser } from "../../context/userContext";
;
export const Categories = () => {


	const [selectedList, setSelectedList] = useState([])
	const [currentList, setCurrentList] = useState('')

	const { userLists } = useUser();
	
	console.log(userLists);

	const handleLists = (e) => {
		setCurrentList(e.target.id);
	}

	useEffect(() => {
		if (userLists) {
			setSelectedList(userLists.find((element) => element.id === parseInt(currentList)))
			console.log(selectedList);
		}

	}, [currentList])


	console.log(userLists);


	return (

		<>
			<div className="flex flex-col items-center justify-center h-full w-full">
				<div className="grid grid-cols-4 grid-flow-row gap-10 w-9/12 ">
					{
						userLists && userLists.map((element) => (
							<div key={element.id}>
								<div className=" z-10 grid grid-rows-2 grid-flow-col  relative filter grayscale hover:grayscale-0 rounded-lg " onClick={handleLists} >
									<img className=" cursor-pointer" src={element.songs[0].thumbnail} alt="list imgs" />
									<img className=" cursor-pointer" src={element.songs[1].thumbnail} alt="list imgs" />
									<img className=" cursor-pointer" src={element.songs[2].thumbnail} alt="list imgs" />
									<img className=" cursor-pointer" src={element.songs[3].thumbnail} alt="list imgs" />
									<span id={element.id} className="absolute p-4 h-full w-full text-white text-2xl font-bold">{element.name}</span>
								</div>
							</div>
						))
					}
				</div>
			</div>

			<div className="flex flex-col items-center justify-center h-full w-full">
				<div className="grid grid-cols-4 grid-flow-row gap-10 h-3/4 w-9/12 " >

					{
						selectedList?.songs && selectedList.songs.map((data, i) => (

							<SongCard
								key={i}
								data={data}
								img={data.thumbnail}
								name={data.name}
								artist={data.artist}
							/>

						))
					}

				</div>
			</div>
		</>



	)

};

