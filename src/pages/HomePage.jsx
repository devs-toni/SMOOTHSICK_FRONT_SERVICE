import Category from "../components/Home/Category";
import { useEffect, useState } from "react";
import Cover from "../components/Home/Cover"
import Section from "../components/Home/Section"
import { v4 as uuidv4 } from 'uuid';
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
const albums = [
  {
    "id": 1,
    "name": "Flyga",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273cfb34a37cfed6297d8c18231",
    "artist": "Kim Cesarion"
  },
  {
    "id": 2,
    "name": "XXX (Bow Wow Wow)",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273256e16efc88a39e4795d5f32",
    "artist": "C.Gambino"
  },
  {
    "id": 3,
    "name": "Stay A Little Longer",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2732cf9821eb5087702a63330b5",
    "artist": "Nicky Romero"
  },
  {
    "id": 4,
    "name": "WTF",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b2730b7020f4bce3fc16f5370df3",
    "artist": "Denz"
  },
  {
    "id": 5,
    "name": "Vivaldi",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273a7fc8699c8a8c6dc4b90c948",
    "artist": "Jesper Swärd"
  },
  {
    "id": 6,
    "name": "Velvet Pony Trax 11 part 2",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27347d2bc41f459a0422c3dfff5",
    "artist": "Axel Boman"
  },
  {
    "id": 7,
    "name": "PARTYPINGLA",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273e467c6a0b070f390daa47693",
    "artist": "Rasmus Hultgren"
  },
  {
    "id": 8,
    "name": "Someone To Love",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b273e9e5fbbde2d4147260db99bf",
    "artist": "Dimitri Vangelis & Wyman"
  },
  {
    "id": 9,
    "name": "I samma bil",
    "imageUrl": "https://i.scdn.co/image/ab67616d0000b27349108981b176704992078242",
    "artist": "Hemliga Klubben"
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
        <div className="flex flex-row justify-around items-center w-32">
          {
            albums.map(({ id, name, imageUrl, artist }) => {
              return (
                <Category
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
    </div>
  )
}
