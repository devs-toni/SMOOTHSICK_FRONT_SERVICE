import { SongCard } from "../Categories/SongCard";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import { useAuthContext } from "../../context/AuthContext";
import { data } from "autoprefixer";
import { useUser } from "../../context/UserContext";
import { useLanguage } from "../../context/LanguageContext";


export const Categories = () => {
	const { userLists } = useUser();
	const { text } = useLanguage();


	const [selectedList, setSelectedList] = useState();
	const [currentList, setCurrentList] = useState();
	const [selectedListId, setSelectedListId] = useState();
	const [selectedListImg, setSelectedListImg] = useState();
	const [changeImg, setChangeImg] = useState()


	const handleSetBgImg = (e) => {
		setSelectedListId(e.target.id)
	}

	// const handleRemoveBgImg = () => {
	// 	setChangeImg('')
	// }

	const handleLists = (e) => {
		setCurrentList(e.target.id);
	}

	useEffect(() => {
		if (userLists) {
			setSelectedList(userLists.find((i) => i.id === parseInt(currentList)))
			setSelectedListImg(userLists.find((i) => i.id === parseInt(selectedListId)))
			if (selectedListImg) {
				setChangeImg(selectedListImg.songs[0].thumbnail)
			}
		}
	}, [currentList, selectedListId, selectedListImg])




	return (


		<>
			<img src={changeImg} alt="pruebaa" className="z-auto right-0 fixed w-screen h-screen object-cover opacity-20" />
			<div className="grid grid-rows-2 gap-8 pt-24 pr-24 pl-24  h-full w-full">
				<div className="z-10 flex center flex-row gap-10 justify-center mt-4 rounded-xl md:min-w-400 lg:min-w-400 xl:min-w-400">
					<div className="flex flex-col gap-10 items-center justify-center m-10 border w-6/12 bg-chart rounded-lg">
						AQUI VA TU COMPONENTE SOFI
					</div>
					<div className="flex flex-col gap-4 items-center justify-center m-10">
						<h3 className="text-3xl ">{text.categories.lists}</h3>
						<div className="grid grid-cols-2 gap-10 items-center justify-center">
							{
								userLists && userLists.map((element) => (
									<React.Fragment key={element.id}>
										<div
											className="rounded-lg grid grid-rows-2 grid-flow-col w-32 relative filter grayscale hover:grayscale-0"
											onMouseEnter={handleSetBgImg}
											// onMouseOut={handleRemoveBgImg}
											onClick={handleLists}
										>
											<img className=" cursor-pointer rounded-tl-lg" src={element.songs[0].thumbnail} alt="list imgs" />
											<img className=" cursor-pointer rounded-bl-lg" src={element.songs[1].thumbnail} alt="list imgs" />
											<img className=" cursor-pointer rounded-tr-lg" src={element.songs[2].thumbnail} alt="list imgs" />
											<img className=" cursor-pointer rounded-br-lg" src={element.songs[3].thumbnail} alt="list imgs" />
											<span id={element.id} className="absolute flex items-center justify-center p-4 h-full w-full text-white text-2xl ">{element.name}</span>
										</div>
									</React.Fragment>
								))
							}
						</div>
					</div>
				</div>
				<div className="grid grid-cols-7 place-items-center h-34 text-center justify-center w-full " >
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

