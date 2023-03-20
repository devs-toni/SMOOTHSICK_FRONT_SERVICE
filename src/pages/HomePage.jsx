import { useEffect, useState } from "react";
import Cover from "../components/Home/Cover"
import Section from "../components/Home/Section"
const tracks = [
  [
    {
      "id": 1,
      "name": "Better of alone",
      "artist": "RXBYN",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/better_off_alone_gfmcby.jpg",
      "genre": "piano",
      "liked": true
    },
    {
      "id": 2,
      "name": "Alone",
      "artist": "Color Out",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/alone_rfib7a.jpg",
      "genre": "poprock",
      "liked": true
    },
    {
      "id": 3,
      "name": "Mahidevran - Maze of sorrow",
      "artist": "MAHIDEVRAN ROCK BAND",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644583757/tracks-thumbnails-dev/Maze_of_sorrow_r1crlr.jpg",
      "genre": "chillout",
      "liked": false
    },
  ],
  [
    {
      "id": 17,
      "name": "Un Ratito Nama (Prod: Duran The Coach)",
      "artist": "Igor Pumphonia",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587219/tracks-dev/Lessky_-_Un_Ratito_Nama__Prod__Duran_The_Coach__npuws5.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587222/tracks-thumbnails-dev/Un_ratito_m2aeq0.jpg",
      "genre": "reggaeton",
      "liked": false
    },
    {
      "id": 18,
      "name": "Sax Is My Cardio",
      "artist": "KUZINMUZIN",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644587961/tracks-dev/Kuzinmuzin_-_Sax_Is_My_Cardio_fqmvwb.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644587960/tracks-thumbnails-dev/Sax_kgjfn8.jpg",
      "genre": "funk",
      "liked": false
    },
    {
      "id": 19,
      "name": "Chill Lofi Hip Hop Type Beat",
      "artist": "PERYCREEP",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644653754/tracks-dev/PeryCreep_-_Chill_Lofi_Hip_Hop_Type_Beat_l2k8zv.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644653692/tracks-thumbnails-dev/Chill_Lofi_Hip_Hop_Type_Beat_ltpm24.jpg",
      "genre": "groovy",
      "liked": false
    },
  ],
  [
    {
      "id": 12,
      "name": "Under Water",
      "artist": "THE.MADPIX.PROJECT",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586422/tracks-dev/The.madpix.project_-_Under_Water_2_gyvrkl.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586423/tracks-thumbnails-dev/Under_Water_yoirsy.jpg",
      "genre": "electronic",
      "liked": false
    },
    {
      "id": 13,
      "name": "Better",
      "artist": "A8",
      "url": "https://res.cloudinary.com/dmkdsujzh/video/upload/v1644586627/tracks-dev/A8_MUSIC_PRODUCTIONS_-_Better_umwfkh.mp3",
      "thumbnail": "https://res.cloudinary.com/dmkdsujzh/image/upload/v1644586622/tracks-thumbnails-dev/A8_vxgyaf.jpg",
      "genre": "pop",
      "liked": false
    },
  ]
]
const artists = [
  {
    "id": 1,
    "name": "Kim Cesarion",
    "genres": ["swedish pop", "swedish soul"],
    "popularity": 38,
    "photoUrl": "https://i.scdn.co/image/ab6761610000e5eb842fae710a21f648e26dd910"
  },
  {
    "id": 2,
    "name": "C.Gambino",
    "genres": [
      "swedish gangsta rap",
      "swedish hip hop",
      "swedish trap pop"
    ],
    "popularity": 56,
    "photoUrl": "https://i.scdn.co/image/ab6761610000e5eb9fb2b5ff325f43536a2a4ae2"
  },
  {
    "id": 3,
    "name": "Nicky Romero",
    "genres": [
      "big room",
      "dance pop",
      "dutch edm",
      "edm",
      "electro house",
      "pop dance",
      "pop edm",
      "progressive electro house",
      "progressive house",
      "tropical house"
    ],
    "popularity": 63,
    "photoUrl": "https://i.scdn.co/image/ab6761610000e5eb8d683372296589f7c718dea6"
  }
]

export const HomePage = () => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState(tracks[0]);
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-full w-full mt-20">
        <div className="w-5/6 xl:flex md:w-3/5 lg:w-10/12 home-carousel">
          <Cover
            artists={artists}
            showButtons={true}
            autoPlay={false}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            tracks={tracks}
            setSelectedTracks={setSelectedTracks}
            loaded={loaded}
            setLoaded={setLoaded}
          />
          <Section
            tracks={selectedTracks}
            loaded={loaded}
          />
        </div>
      </div>
    </div>
  )
}
